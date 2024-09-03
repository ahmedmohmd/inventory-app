import { QueryOrder } from "../common/enums/order.enum";
import { OrdersSortKey } from "./orders.enum";
import { z } from "zod";

const OrderStatus = z.enum(["pending", "completed"]);
const createOrderSchema = z.object({
	supplierId: z.number(),
	items: z.array(
		z.object({
			productId: z.number(),
			quantity: z.number(),
		})
	),
});

const orderIdSchema = z.object({
	id: z.string().regex(/^\d+$/),
});

const changeOrderStateSchema = z.object({
	status: OrderStatus,
});

const OrdersQuerySortBySchema = z.enum([
	OrdersSortKey.TOTAL,
	OrdersSortKey.CREATED_AT,
]);
const OrderQueryStatus = z.enum(["pending", "completed"]);
const OrdersQueryOrder = z.enum([QueryOrder.ASC, QueryOrder.DESC]);
const findAllOrdersQuerySchema = z.object({
	limit: z.string().regex(/^\d+$/).optional(),
	page: z.string().regex(/^\d+$/).optional(),
	supplierId: z.string().regex(/^\d+$/).optional(),
	sortBy: OrdersQuerySortBySchema.optional(),
	order: OrdersQueryOrder.optional(),
	status: OrderQueryStatus.optional(),
});

export default {
	createOrderSchema,
	orderIdSchema,
	changeOrderStateSchema,
	findAllOrdersQuerySchema,
};
