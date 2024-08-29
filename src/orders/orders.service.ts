import * as ordersRepository from "./orders.repository";
// import { CreateOrder } from "./orders.types";

export const findAllOrders = async () => {
	return await ordersRepository.findAllOrders();
};

export const findOrderById = async (id: number) => {
	return await ordersRepository.findOrderById(id);
};

// export const insertOrder = (data: CreateOrder) => {};
