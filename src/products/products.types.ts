import { OrderBy, ProductStatus, SortBy } from "./products.enum";

type CreateProduct = {
	name: string;
	description: string;
	price: number;
	status: "reserved" | "in-stock" | "out-of-stock" | "returned" | "damaged";
	sku: string;
	supplierId: number;
	categoryId: number;
	sectionId: number;
};

type UpdateProduct = Partial<CreateProduct>;

type FindAllProductsQuery = {
	page?: number;
	limit?: number;
	supplierId?: number;
	sectionId?: number;
	categoryId?: number;
	status?: ProductStatus;
	sortBy?: SortBy;
	orderBy?: OrderBy;
};

export { CreateProduct, UpdateProduct, FindAllProductsQuery };
