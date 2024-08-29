export type CreateOrderItem = {
	productId: number;
	quantity: number;
	orderId: number;
};

export type CreateOrder = {
	total: number;
	status: "pending" | "completed";
};

export type UpdateOrder = Partial<CreateOrder>;
