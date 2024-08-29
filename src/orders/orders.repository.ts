import { eq } from "drizzle-orm";
import { db } from "../db";
import { orderItems } from "../db/schema/order-item.schema";
import { orders } from "../db/schema/order.schema";
import { CreateOrder, UpdateOrder } from "./orders.types";

export const findAllOrders = async () => {
	return await db
		.select()
		.from(orders)
		.innerJoin(orderItems, eq(orders.id, orderItems.orderId));
};

export const findOrderById = async (id: number) => {
	return await db.query.orders.findFirst({
		where: eq(orders.id, id),
		with: {
			orderItems: true,
		},
	});
};

export const insertOrder = async (data: CreateOrder) => {
	return await db
		.insert(orders)
		.values(data as any) // eslint-disable-line
		.returning();
};

export const updateOrder = async (id: number, data: UpdateOrder) => {
	return await db.update(orders).set(data).where(eq(orders.id, id)).returning();
};

export const deleteOrder = async (id: number) => {
	return await db.delete(orders).where(eq(orders.id, id)).execute();
};
