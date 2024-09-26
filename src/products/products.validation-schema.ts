import { z } from "zod";
import { OrderBy, ProductStatus, SortBy } from "./products.enum";

const ProductColor = z.enum([
	"blue",
	"red",
	"green",
	"gray",
	"black",
	"white",
	"orange",
	"yellow",
	"purple",
]);

const ProductBrand = z.enum([
	"apple",
	"asus",
	"hp",
	"lenovo",
	"microsoft",
	"nokia",
	"sony",
	"toshiba",
	"xiaomi",
	"acer",
	"alienware",
	"msi",
	"razer",
	"lg",
	"nvidia",
]);

const createProductSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	price: z.string().regex(/^\d+$/),
	status: z.string(),
	sku: z.string(),
	supplierId: z.string().regex(/^\d+$/),
	categoryId: z.string().regex(/^\d+$/),
	sectionId: z.string().regex(/^\d+$/),
	color: ProductColor,
	brand: ProductBrand,
});

const updateProductSchema = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
	price: z.string().regex(/^\d+$/).optional(),
	status: z.string().optional(),
	sku: z.string().optional(),
	supplierId: z.string().regex(/^\d+$/).optional(),
	categoryId: z.string().regex(/^\d+$/).optional(),
	sectionId: z.string().regex(/^\d+$/).optional(),
	color: ProductColor.optional(),
	brand: ProductBrand.optional(),
});

const productIdSchema = z.object({
	id: z.string().regex(/^\d+$/),
});

const SortBySchema = z.enum([SortBy.PRICE, SortBy.NAME]);

const OrderBySchema = z.enum([OrderBy.ASC, OrderBy.DESC]);
const ProductStatusSchema = z.enum([
	ProductStatus.RESERVED,
	ProductStatus.IN_STOCK,
	ProductStatus.OUT_OF_STOCK,
	ProductStatus.RETURNED,
	ProductStatus.DAMAGED,
]);

const findAllProductsQuerySchema = z.object({
	limit: z.string().regex(/^\d+$/).optional(),
	page: z.string().regex(/^\d+$/).optional(),

	supplierId: z.string().regex(/^\d+$/).optional(),
	categoryId: z.string().regex(/^\d+$/).optional(),
	sectionId: z.string().regex(/^\d+$/).optional(),
	status: ProductStatusSchema.optional(),

	sortBy: SortBySchema.optional(),
	orderBy: OrderBySchema.optional(),
	color: ProductColor.optional(),
	brand: ProductBrand.optional(),
	minPrice: z.string().regex(/^\d+$/).optional(),
	maxPrice: z.string().regex(/^\d+$/).optional(),
});

const searchProductsQuerySchema = z.object({
	limit: z.string().regex(/^\d+$/).optional(),
	page: z.string().regex(/^\d+$/).optional(),

	supplierId: z.string().regex(/^\d+$/).optional(),
	categoryId: z.string().regex(/^\d+$/).optional(),
	sectionId: z.string().regex(/^\d+$/).optional(),
	status: ProductStatusSchema.optional(),

	sortBy: SortBySchema.optional(),
	orderBy: OrderBySchema.optional(),
	color: ProductColor.optional(),
	brand: ProductBrand.optional(),
	minPrice: z.string().regex(/^\d+$/).optional(),
	maxPrice: z.string().regex(/^\d+$/).optional(),
	search: z.string(),
});

const productsAutocompleteSchema = z.object({
	search: z.string(),
});

export default {
	createProductSchema,
	productIdSchema,
	updateProductSchema,
	findAllProductsQuerySchema,
	searchProductsQuerySchema,
	productsAutocompleteSchema,
};
