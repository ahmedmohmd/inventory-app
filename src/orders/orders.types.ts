import { OrderStatus } from "./orders.enum";

export type OrderItem = {
	productId: number;
	quantity: number;
};

export type CreateOrder = {
	supplierId: number;
	items: OrderItem[];
};

export type IOrder = {
	total: number;
	status?: OrderStatus;
	supplierId: number;
};

export type FindAllOrdersQuery = {
	page?: number;
	limit?: number;
	supplierId?: number;
	sortBy?: "createdAt" | "total";
	order?: "asc" | "desc";
	status?: "pending" | "completed";
};

export type UpdateOrder = Partial<CreateOrder>;

export type UpdateOrderStatus = {
	status: OrderStatus;
};
