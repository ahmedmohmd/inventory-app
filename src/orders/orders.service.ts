import createHttpError from "http-errors";
import ordersRepository from "./orders.repository";
import { CreateOrder, FindAllOrdersQuery } from "./orders.types";
import { OrderStatus } from "./orders.enum";
import { config } from "../../config/config";
import orderItems from "../order-items";
import productsModule from "../products";
import logger from "../logging";
import stocks from "../stocks";
import mail from "../mail";
import users from "../users";
import { Role } from "../common/enums/user-role.enum";
import { ENV } from "../../config/env";
import elasticSearch from "../elastic-search";

/**
 * Retrieves a list of orders based on the provided query parameters.
 *
 * @param {FindAllOrdersQuery} query - The query parameters to filter orders by.
 * @return {object} An object containing pagination metadata and an array of orders.
 */
const findAllOrders = async (query: FindAllOrdersQuery) => {
	const currentPage = Number(query.page) || config.pagination.page;
	const pageSize = Number(query.limit) || config.pagination.limit;

	const elasticQueryOptions: { bool: { must: Record<string, unknown>[] } } = {
		bool: {
			must: [],
		},
	};

	if (query.status) {
		elasticQueryOptions.bool.must.push({
			term: {
				status: query.status,
			},
		});
	}

	if (query.warehouseId) {
		elasticQueryOptions.bool.must.push({
			term: {
				warehouseId: Number(query.supplierId),
			},
		});
	}

	if (query.supplierId) {
		elasticQueryOptions.bool.must.push({
			term: {
				supplierId: Number(query.supplierId),
			},
		});
	}

	const sortOptions: Record<string, { order: "asc" | "desc" }>[] = [];

	if (query.sortBy) {
		const sortOrder = query.orderBy === "desc" ? "desc" : "asc";

		if (typeof query.sortBy === "string") {
			sortOptions.push({
				[`${query.sortBy}.keyword`]: { order: sortOrder },
			});
		} else {
			sortOptions.push({
				[query.sortBy]: { order: sortOrder },
			});
		}
	} else {
		sortOptions.push({
			createdAt: { order: "asc" },
		});
	}

	const options: Record<string, object | string | number> = {
		index: "orders",
		from: (currentPage - 1) * pageSize,
		size: pageSize,
		sort: sortOptions,
	};

	if (elasticQueryOptions.bool.must.length > 0) {
		options.query = elasticQueryOptions;
	} else {
		options.query = {
			match_all: {},
		};
	}

	const result = await elasticSearch.client.search(options);

	const final: Record<string, object | string | number> = {};

	const totalCount = result.hits.total
		? (result.hits.total as { value: number }).value
		: 0;
	const totalPages = Math.ceil(totalCount / pageSize);
	const nextPage = currentPage < totalPages ? currentPage + 1 : null;
	const prevPage = currentPage > 1 ? currentPage - 1 : null;

	final.data = result.hits ? result?.hits?.hits.map((hit) => hit._source) : [];
	final.pagination = {
		total_count: totalCount,
		total_pages: totalPages,
		current_page: currentPage,
		next_page: nextPage,
		prev_page: prevPage,
	};

	return final;
};

/**
 * Finds an order by its ID.
 *
 * @param {number} id - The ID of the order to find.
 * @return {Promise<Order>} A promise that resolves to the found order, or throws a NotFound error if the order is not found.
 */
const findOrderById = async (id: number) => {
	const order = await ordersRepository.findOrderById(id);

	if (!order) {
		logger.error.error(`Order with ID: ${id} not found.`);

		throw new createHttpError.NotFound(`Order with ID: ${id} not found.`);
	}

	return order;
};

/**
 * Inserts a new order into the database.
 *
 * @param {CreateOrder} data - The order data to be inserted.
 * @return {Promise<Order[]>} A promise that resolves to the created order.
 * @throws {createHttpError.BadRequest} If a product is not found or if products are not from the same supplier.
 */
const insertOrder = async (data: CreateOrder) => {
	const productPromises = data.items.map((item) =>
		productsModule.service.findProductById(item.productId)
	);
	const products = await Promise.all(productPromises);

	let totalMoney = 0;

	for (const item of data.items) {
		const targetProduct = products.find(
			(product) => product.id === item.productId
		);

		if (!targetProduct) {
			throw new createHttpError.BadRequest(
				`Product with ID: ${item.productId} not found.`
			);
		}

		totalMoney += targetProduct.price * item.quantity;
	}

	const isFromSameSupplier = products.every((product) => {
		return product.supplierId === data.supplierId;
	});

	if (!isFromSameSupplier) {
		throw new createHttpError.BadRequest(
			"Products must be from the same supplier."
		);
	}

	const createdOrder = await ordersRepository.insertOrder({
		status: OrderStatus.PENDING,
		total: totalMoney,
		supplierId: data.supplierId,
		warehouseId: data.warehouseId,
	});

	if (!createdOrder) {
		logger.error.error(`Failed to create order.`);
		throw new createHttpError.BadRequest(`Failed to create order.`);
	}

	const orderItemsPromises = data.items.map((item) =>
		orderItems.service.insertOrderItem({
			orderId: createdOrder.id,
			productId: item.productId,
			quantity: item.quantity,
		})
	);

	await Promise.all(orderItemsPromises);

	await elasticSearch.service.addToIndex(
		"orders",
		createdOrder,
		String(createdOrder.id)
	);

	return createdOrder;
};

/**
 * Changes the state of an order.
 *
 * @param {number} orderId - The ID of the order to be updated.
 * @param {OrderStatus} status - The new status of the order.
 * @return {Promise} A promise that resolves to the updated order.
 */
const changeOrderState = async (orderId: number, status: OrderStatus) => {
	const order = await ordersRepository.findOrderById(orderId);
	if (!order) {
		logger.error.error(`Order with ID: ${orderId} not found.`);

		throw new createHttpError.NotFound(`Order with ID: ${orderId} not found.`);
	}

	if (order.status === OrderStatus.COMPLETED) {
		logger.error.error(`You can't change the status of a completed order.`);

		throw new createHttpError.BadRequest(
			"You can't change the status of a completed order."
		);
	}

	const updateResult = await ordersRepository.changeOrderState(orderId, status);

	const productsPromises = order.orderItems.map((item) =>
		productsModule.service.findProductById(item.productId)
	);
	const products = await Promise.all(productsPromises);

	const updateProductsQuantity = order.orderItems.map(async (item) => {
		const product = products.find((product) => product.id === item.productId);

		if (!product) {
			logger.error.error(`Product with ID: ${item.productId}.`);

			throw new createHttpError.BadRequest("Product not found");
		}

		const productStock = await stocks.service.findStockByAllParams(
			product.id,
			order.warehouseId
		);

		if (!productStock) {
			logger.error.error(
				`Stock with Product ID: ${product.id} and Warehouse ID: ${order.warehouseId} not Found.`
			);

			throw new createHttpError.BadRequest(
				`Stock with Product ID: ${product.id} and Warehouse ID: ${order.warehouseId} not Found.`
			);
		}

		await stocks.service.updateStock(productStock?.id, {
			quantity: productStock.quantity + item.quantity,
		});
	});

	if (status === OrderStatus.COMPLETED) {
		await Promise.all(updateProductsQuantity);
	}

	await elasticSearch.service.updateIndex("orders", String(orderId), {
		status: status,
	});

	const adminUsers = await users.service.findUsersByRole(Role.ADMIN);
	const sendMailsPromises = adminUsers.map((user) => {
		mail.service.sendMail({
			from: ENV.SENDER_EMAIL,
			to: user.email,
			subject: "Order Status Changed",
			text: `The status of the order with ID: ${order.id} has been changed to: ${status}.`,
		});
	});

	await Promise.all(sendMailsPromises);

	return updateResult;
};

/**
 * Deletes an order by its ID.
 *
 * @param {number} id - The ID of the order to be deleted.
 * @return {Promise} A promise that resolves with the result of the deletion operation.
 */
const deleteOrder = async (id: number) => {
	const order = await ordersRepository.findOrderById(id);

	if (!order) {
		logger.error.error(`Order with ID: ${id} not found.`);

		throw new createHttpError.NotFound(`Order with ID: ${id} not found.`);
	}

	await orderItems.service.deleteOrderItem(order.id);

	const deletedOrder = await ordersRepository.deleteOrder(id);

	await elasticSearch.service.deleteFromIndex("orders", String(id));

	return deletedOrder;
};

export default {
	findAllOrders,
	findOrderById,
	insertOrder,
	changeOrderState,
	deleteOrder,
};
