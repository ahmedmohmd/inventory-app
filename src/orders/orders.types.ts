import { OrderBy } from "../products/products.enum";
import { OrdersSortKey, OrderStatus } from "./orders.enum";

export type OrderItem = {
	productId: number;
	quantity: number;
};

export type CreateOrder = {
	supplierId: number;
	items: OrderItem[];
	warehouseId: number;
};

export type IOrder = {
	total: number;
	status?: OrderStatus;
	supplierId: number;
	warehouseId: number;
};

export type FindAllOrdersQuery = {
	page?: number;
	limit?: number;
	supplierId?: number;
	sortBy?: OrdersSortKey;
	orderBy?: OrderBy;
	status?: "pending" | "completed";
	warehouseId?: number;
};

export type UpdateOrder = Partial<CreateOrder>;

export type UpdateOrderStatus = {
	status: OrderStatus;
};
