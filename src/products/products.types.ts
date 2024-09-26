import { OrderBy, ProductStatus, SortBy } from "./products.enum";

type ProductBrands =
	| "apple"
	| "asus"
	| "hp"
	| "lenovo"
	| "microsoft"
	| "nokia"
	| "sony"
	| "toshiba"
	| "xiaomi"
	| "acer"
	| "alienware"
	| "msi"
	| "razer"
	| "lg"
	| "nvidia";

type ProductColors =
	| "blue"
	| "red"
	| "green"
	| "gray"
	| "black"
	| "white"
	| "orange"
	| "yellow"
	| "purple";

type CreateProduct = {
	name: string;
	description: string;
	price: number;
	status: "reserved" | "in-stock" | "out-of-stock" | "returned" | "damaged";
	sku: string;
	supplierId: number;
	categoryId: number;
	sectionId: number;
	color: ProductColors;
	brand: ProductBrands;
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
	color?: ProductColors;
	brand?: ProductBrands;
	minPrice?: number;
	maxPrice?: number;
};

type SearchProductsQuery = FindAllProductsQuery & {
	search: string;
};

export {
	CreateProduct,
	UpdateProduct,
	FindAllProductsQuery,
	SearchProductsQuery,
};
