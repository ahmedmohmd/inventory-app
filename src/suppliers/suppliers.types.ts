type CreateSupplier = {
	name: string;
	email: string;
	phone: string;
	address: string;
};

type UpdateSupplier = Partial<CreateSupplier>;

type FindAllSuppliersQuery = {
	page?: number;
	limit?: number;
};

export { CreateSupplier, UpdateSupplier, FindAllSuppliersQuery };
