import { z } from "zod";

const createCategorySchema = z.object({
	name: z.string(),
	description: z.string().optional(),
});

const updateCategorySchema = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
});

const categoryIdSchema = z.object({
	id: z.string().regex(/^\d+$/),
});

export { categoryIdSchema, createCategorySchema, updateCategorySchema };
