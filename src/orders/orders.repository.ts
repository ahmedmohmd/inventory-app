import { asc, count, desc, eq } from "drizzle-orm";
import { db } from "../db";
import { orders } from "../db/schema/order.schema";
import { FindAllOrdersQuery, IOrder } from "./orders.types";
import { OrderStatus } from "./orders.enum";
import { config } from "../../config/config";
import { QueryOrder } from "../common/enums/order.enum";

export const findAllOrders = async (query: FindAllOrdersQuery) => {
	const page = Number(query.page) || config.pagination.page;
	const limit = Number(query.limit) || config.pagination.limit;
	const supplierId = Number(query.supplierId);

	// eslint-disable-next-line
	const queryOptions: any = {
		with: {
			orderItems: true,
			supplier: true,
		},

		limit: limit,
		offset: (page - 1) * limit,
	};

	if (supplierId) {
		queryOptions.where = eq(orders.supplierId, supplierId);
	}

	if (query.sortBy) {
		if (query.sortBy && query.order === QueryOrder.DESC) {
			queryOptions.orderBy = [desc(orders[query.sortBy])];
		} else {
			queryOptions.orderBy = [asc(orders[query.sortBy])];
		}
	}

	return await db.query.orders.findMany(queryOptions);
};

export const findOrderById = async (id: number) => {
	return await db.query.orders.findFirst({
		where: eq(orders.id, id),
		with: {
			orderItems: true,
			supplier: true,
		},
	});
};

export const insertOrder = async (data: IOrder) => {
	return await db
		.insert(orders)
		.values(data as any) // eslint-disable-line
		.returning();
};

export const changeOrderState = async (id: number, status: OrderStatus) => {
	return await db
		.update(orders)
		.set({
			status: status,
		})
		.where(eq(orders.id, id))
		.returning();
};

export const deleteOrder = async (id: number) => {
	return await db.delete(orders).where(eq(orders.id, id)).execute();
};

// Helpers methods
export const countAllOrders = async () => {
	return await db
		.select({
			count: count(),
		})
		.from(orders);
};
