import createHttpError from "http-errors";
import { findProductById } from "../products/products.service";
import { insertOrderItem } from "./order-items.repository";
import * as ordersRepository from "./orders.repository";
import { CreateOrder, FindAllOrdersQuery } from "./orders.types";
import { OrderStatus } from "./orders.enum";
import * as orderItemsRepository from "./order-items.repository";
import { config } from "../../config/config";

export const findAllOrders = async (query: FindAllOrdersQuery) => {
	const page = Number(query.page) || config.pagination.page;
	const limit = Number(query.limit) || config.pagination.limit;

	const allOrders = await ordersRepository.findAllOrders(query);
	const [totalCount] = await ordersRepository.countAllOrders();
	const totalPages = Math.ceil(totalCount.count / limit);
	const currentPage = page;
	const nextPage = currentPage < totalPages ? currentPage + 1 : null;
	const prevPage = currentPage > 1 ? currentPage - 1 : null;

	return {
		pagination: {
			page_size: limit,
			total_count: totalCount.count,
			total_pages: totalPages,
			current_page: currentPage,
			next_page: nextPage,
			prev_page: prevPage,
		},

		data: allOrders,
	};
};

export const findOrderById = async (id: number) => {
	const targetOrder = await ordersRepository.findOrderById(id);

	if (!targetOrder) {
		throw new createHttpError.NotFound(`Order with ID: ${id} not found.`);
	}

	return targetOrder;
};

export const insertOrder = async (data: CreateOrder) => {
	let total = 0;
	const allProducts: any[] = []; // eslint-disable-line

	for (const item of data.items) {
		const targetProduct = await findProductById(item.productId); // eslint-disable-line

		if (!targetProduct) {
			throw new createHttpError.BadRequest("Product not found");
		}

		allProducts.push(targetProduct);

		total += targetProduct.price * item.quantity;
	}

	const isTheSameSupplier = allProducts.every((product) => {
		return product.supplierId === data.supplierId;
	});

	if (!isTheSameSupplier) {
		throw new createHttpError.BadRequest(
			"Products must be from the same supplier"
		);
	}

	const createdOrder = await ordersRepository.insertOrder({
		status: "pending",
		total: total,
		supplierId: data.supplierId,
	});

	if (createdOrder.length > 0) {
		for (const item of data.items) {
			//eslint-disable-next-line
			const order = await insertOrderItem({
				orderId: createdOrder[0].id,
				productId: item.productId,
				quantity: item.quantity,
			});
		}
	}

	return createdOrder;
};

export const changeOrderState = async (
	orderId: number,
	status: OrderStatus
) => {
	const targetOrder = await ordersRepository.findOrderById(orderId);

	if (!targetOrder) {
		throw new createHttpError.NotFound(`Order with ID: ${orderId} not found.`);
	}

	return await ordersRepository.changeOrderState(orderId, status);
};

export const deleteOrder = async (id: number) => {
	const targetOrder = await ordersRepository.findOrderById(id);

	if (!targetOrder) {
		throw new createHttpError.NotFound(`Order with ID: ${id} not found.`);
	}

	await orderItemsRepository.deleteOrderItem(targetOrder.id);

	return await ordersRepository.deleteOrder(id);
};
