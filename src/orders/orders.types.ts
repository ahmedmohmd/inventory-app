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
	status: "pending" | "completed";
};

export type UpdateOrder = Partial<CreateOrder>;
