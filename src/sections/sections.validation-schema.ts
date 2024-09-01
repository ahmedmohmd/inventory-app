import { z } from "zod";

const SectionNameSchema = z.enum([
	"A1",
	"B2",
	"C3",
	"D4",
	"E5",
	"F6",
	"G7",
	"H8",
	"I9",
	"J0",
]);

const createSectionSchema = z.object({
	name: SectionNameSchema,
	description: z.string(),
});

const updateSectionSchema = z.object({
	name: SectionNameSchema.optional(),
	description: z.string().optional(),
});

const sectionIdSchema = z.object({
	id: z.string().regex(/^\d+$/),
});

export { createSectionSchema, sectionIdSchema, updateSectionSchema };
