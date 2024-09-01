export type CreateOrderItem = {
	productId: number;
	quantity: number;
	orderId: number;
};

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
	status?: "pending" | "completed";
	supplierId: number;
};

export type FindAllOrdersQuery = {
	page?: number;
	limit?: number;
	supplierId?: number;
	sortBy?: "createdAt" | "total";
	order?: "asc" | "desc";
};

export type UpdateOrder = Partial<CreateOrder>;
