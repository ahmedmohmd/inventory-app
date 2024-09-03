import { z } from "zod";

const createProductSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	price: z.number(),
	status: z.string(),
	sku: z.string(),
	supplierId: z.number(),
	categoryId: z.number(),
	sectionId: z.number(),
	qty: z.number(),
});

const updateProductSchema = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
	price: z.number().optional(),
	status: z.string().optional(),
	sku: z.string().optional(),
	supplierId: z.number().optional(),
	categoryId: z.number().optional(),
	sectionId: z.number().optional(),
	qty: z.number().optional(),
});

const productIdSchema = z.object({
	id: z.string().regex(/^\d+$/),
});

export { createProductSchema, productIdSchema, updateProductSchema };
