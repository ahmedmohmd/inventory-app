import createHttpError from "http-errors";
import { findProductById } from "../products/products.service";
import { insertOrderItem } from "./order-items.repository";
import * as ordersRepository from "./orders.repository";
import { CreateOrder } from "./orders.types";
// import { CreateOrder } from "./orders.types";

export const findAllOrders = async () => {
	return await ordersRepository.findAllOrders();
};

export const findOrderById = async (id: number) => {
	return await ordersRepository.findOrderById(id);
};

export const insertOrder = async (data: CreateOrder) => {
	const allProducts: any = {}; // eslint-disable-line
	let total = 0;

	for (const item of data.items) {
		const targetProduct = await findProductById(item.productId); // eslint-disable-line

		total += targetProduct.price * item.quantity;

		allProducts[targetProduct.id] = targetProduct;
	}

	// TODO: validate that all products founded
	for (const item of data.items) {
		if (!allProducts[item.productId]) {
			throw new createHttpError.BadRequest("Product not found");
		}
	}

	// TODO: validate that all products are for one supplier
	let supplier = "";
	for (const item of data.items) {
		if (allProducts[item.productId].supplierName !== supplier) {
			throw new createHttpError.BadRequest(
				"Products must be from the same supplier"
			);
		}

		supplier = allProducts[item.productId].supplierName;
	}

	const createdOrder = await ordersRepository.insertOrder({
		status: "pending",
		total: total,
	});

	for (const item of data.items) {
		//eslint-disable-next-line
		await insertOrderItem({
			orderId: createdOrder.id,
			productId: item.productId,
			quantity: item.quantity,
		});
	}

	return createdOrder;
};
