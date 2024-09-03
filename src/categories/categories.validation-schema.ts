import { z } from "zod";

const createCategorySchema = z.object({
	name: z.string(),
	description: z.string().optional(),
});

const updateCategorySchema = z.object({
	description: z.string().optional(),
});

const categoryIdSchema = z.object({
	id: z.string().regex(/^\d+$/),
});

export default { categoryIdSchema, createCategorySchema, updateCategorySchema };
