import createHttpError from "http-errors";
import ordersRepository from "./orders.repository";
import { CreateOrder, FindAllOrdersQuery } from "./orders.types";
import { OrderStatus } from "./orders.enum";
import { config } from "../../config/config";
import orderItems from "../order-items";
import productsModule from "../products";

/**
 * Retrieves a list of orders based on the provided query parameters.
 *
 * @param {FindAllOrdersQuery} query - The query parameters to filter orders by.
 * @return {object} An object containing pagination metadata and an array of orders.
 */
const findAllOrders = async (query: FindAllOrdersQuery) => {
	const orders = await ordersRepository.findAllOrders(query);

	const currentPage = Number(query.page) || config.pagination.page;
	const pageSize = Number(query.limit) || config.pagination.limit;
	const totalCount = await ordersRepository.countAllOrders(query);
	const totalPages = Math.ceil(totalCount / pageSize);
	const nextPage = currentPage < totalPages ? currentPage + 1 : null;
	const prevPage = currentPage > 1 ? currentPage - 1 : null;

	return {
		pagination: {
			page_size: pageSize,
			total_count: totalCount,
			total_pages: totalPages,
			current_page: currentPage,
			next_page: nextPage,
			prev_page: prevPage,
		},

		data: orders,
	};
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
	});

	const orderItemsPromises = data.items.map((item) =>
		orderItems.service.insertOrderItem({
			orderId: createdOrder[0].id,
			productId: item.productId,
			quantity: item.quantity,
		})
	);
	await Promise.all(orderItemsPromises);

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
		throw new createHttpError.NotFound(`Order with ID: ${orderId} not found.`);
	}

	if (order.status === OrderStatus.COMPLETED) {
		throw new createHttpError.BadRequest(
			"You can't change the status of a completed order."
		);
	}

	const updateResult = await ordersRepository.changeOrderState(orderId, status);

	const productsPromises = order.orderItems.map((item) =>
		productsModule.service.findProductById(item.productId)
	);
	const products = await Promise.all(productsPromises);

	const updateProductsQuantity = order.orderItems.map((item) => {
		const product = products.find((product) => product.id === item.productId);

		if (!product) {
			throw new createHttpError.BadRequest("Product not found");
		}

		return productsModule.service.updateProduct(item.productId, {
			qty: product.qty + item.quantity,
		});
	});

	if (status === OrderStatus.COMPLETED) {
		await Promise.all(updateProductsQuantity);
	}

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
		throw new createHttpError.NotFound(`Order with ID: ${id} not found.`);
	}

	await orderItems.service.deleteOrderItem(order.id);

	return await ordersRepository.deleteOrder(id);
};

export default {
	findAllOrders,
	findOrderById,
	insertOrder,
	changeOrderState,
	deleteOrder,
};
