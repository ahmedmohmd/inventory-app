type CreateProduct = {
	name: string;
	description: string;
	price: number;
	status: "reserved" | "in-stock" | "out-of-stock" | "returned" | "damaged";
	sku: string;
	supplierId: number;
	categoryId: number;
	sectionId: number;

	qty: number;
};

type UpdateProduct = Partial<CreateProduct>;

export { CreateProduct, UpdateProduct };
