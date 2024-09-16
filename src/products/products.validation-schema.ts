import { z } from "zod";
import { OrderBy, ProductStatus, SortBy } from "./products.enum";

const createProductSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	price: z.string().regex(/^\d+$/),
	status: z.string(),
	sku: z.string(),
	supplierId: z.string().regex(/^\d+$/),
	categoryId: z.string().regex(/^\d+$/),
	sectionId: z.string().regex(/^\d+$/),
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
});

const productIdSchema = z.object({
	id: z.string().regex(/^\d+$/),
});

const SortBySchema = z.enum([SortBy.PRICE, SortBy.QUANTITY]);

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
});

export default {
	createProductSchema,
	productIdSchema,
	updateProductSchema,
	findAllProductsQuerySchema,
};
