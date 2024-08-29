type CreateSupplier = {
	name: string;
	email: string;
	phone: string;
	address: string;
};

type UpdateSupplier = Partial<CreateSupplier>;

export { CreateSupplier, UpdateSupplier };
