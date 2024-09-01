import { z } from "zod";

const createProductSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	price: z.string().regex(/^\d+$/),
	status: z.string(),
	sku: z.string(),
	supplierId: z.string().regex(/^\d+$/),
	categoryId: z.string().regex(/^\d+$/),
	sectionId: z.string().regex(/^\d+$/),
	qty: z.string().regex(/^\d+$/),
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
	qty: z.string().regex(/^\d+$/).optional(),
});

const productIdSchema = z.object({
	id: z.string().regex(/^\d+$/),
});

export { createProductSchema, productIdSchema, updateProductSchema };
