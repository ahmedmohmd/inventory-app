export type CreateStock = {
	productId: number;
	warehouseId: number;
	quantity: number;
};

export type UpdateStock = Partial<Pick<CreateStock, "quantity">>;
