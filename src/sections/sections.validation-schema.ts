import { z } from "zod";
import { SectionName } from "./sections.enum";

const SectionNameSchema = z.enum([
	SectionName.ACCESSORIES,
	SectionName.GAMES,
	SectionName.NETWORKS,
	SectionName.OFFICES,
	SectionName.PC,
	SectionName.PC_COMPONENTS,
	SectionName.PERIPHERALS,
	SectionName.SMART_HOME,
	SectionName.SOFTWARE,
	SectionName.STORAGE,
]);

const createSectionSchema = z.object({
	name: SectionNameSchema,
	description: z.string(),
});

const updateSectionSchema = z.object({
	description: z.string().optional(),
});

const sectionIdSchema = z.object({
	id: z.string().regex(/^\d+$/),
});

export default { sectionIdSchema, createSectionSchema, updateSectionSchema };
