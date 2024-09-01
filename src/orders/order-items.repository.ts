import { eq } from "drizzle-orm";
import { db } from "../db";
import { orderItems } from "../db/schema/order-item.schema";
import { CreateOrderItem } from "./orders.types";

export const insertOrderItem = async (data: CreateOrderItem) => {
	return await db.insert(orderItems).values(data).returning();
};

export const deleteOrderItem = async (id: number) => {
	return await db.delete(orderItems).where(eq(orderItems.id, id)).execute();
};

// export const findAllOrderItems = async (orderId: number) => {
// 	return await
// }
