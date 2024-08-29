import { eq } from "drizzle-orm";
import { db } from "../db";
import { sections } from "../db/schema/section.schema";
import { CreateSection, SectionName, UpdateSection } from "./section.types";

export const findAllSections = async () => {
	return await db.select().from(sections);
};

export const findSectionById = async (id: number) => {
	return await db.query.sections.findFirst({
		where: eq(sections.id, id),
	});
};

export const findSectionByName = async (name: SectionName) => {
	return await db.query.sections.findFirst({
		where: eq(sections.name, name),
	});
};

export const insertSection = async (data: CreateSection) => {
	return await db.insert(sections).values(data).returning();
};

export const updateSection = async (id: number, data: UpdateSection) => {
	return await db
		.update(sections)
		.set(data)
		.where(eq(sections.id, id))
		.returning();
};

export const deleteSection = async (id: number) => {
	return await db.delete(sections).where(eq(sections.id, id)).execute();
};
