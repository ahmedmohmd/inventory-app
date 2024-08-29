type CreateProduct = {
	name: string;
	description: string;
	price: number;
	status: "reserved" | "in-stock" | "out-of-stock" | "returned" | "damaged";
	sku: string;
	supplierId: number;
	categoryId: number;
	sectionId:
		| "A1"
		| "B2"
		| "C3"
		| "D4"
		| "E5"
		| "F6"
		| "G7"
		| "H8"
		| "I9"
		| "J0";

	qty: number;
};

type UpdateProduct = Partial<CreateProduct>;

// type UpdateProductStatus =
// 	| "reserved"
// 	| "in-stock"
// 	| "out-of-stock"
// 	| "returned"
// 	| "damaged";

export { CreateProduct, UpdateProduct };
