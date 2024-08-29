import { z } from "zod";

const createSectionSchema = z.object({
	name: z.string(),
	description: z.string(),
});

const updateSectionSchema = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
});

const sectionIdSchema = z.object({
	id: z.string().regex(/^\d+$/),
});

export { createSectionSchema, sectionIdSchema, updateSectionSchema };
