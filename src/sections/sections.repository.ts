import { eq } from "drizzle-orm";
import { db } from "../db";
import { sections } from "../db/schema/section.schema";
import { CreateSection, UpdateSection } from "./section.types";
import { SectionName } from "./sections.enum";

/**
 * Retrieves all sections from the database.
 *
 * @return {Promise<Section[]>} A promise resolving to an array of sections
 */
const findAllSections = async () => {
	return await db.select().from(sections);
};

/**
 * Retrieves a section by its ID from the database.
 *
 * @param {number} id - The ID of the section to retrieve
 * @return {Promise<object | null>} The section object if found, otherwise null
 */
const findSectionById = async (id: number) => {
	return await db.query.sections.findFirst({
		where: eq(sections.id, id),
	});
};

/**
 * Retrieves a section by its name from the database.
 *
 * @param {SectionName} name - The name of the section to retrieve
 * @return {Promise<object | null>} The section object if found, otherwise null
 */
const findSectionByName = async (name: SectionName) => {
	return await db.query.sections.findFirst({
		where: eq(sections.name, name),
	});
};

/**
 * Inserts a new section into the database.
 *
 * @param {CreateSection} data - The section data to be inserted
 * @return {Promise<object>} The newly inserted section object
 */
const insertSection = async (data: CreateSection) => {
	return await db.insert(sections).values(data).returning();
};

const updateSection = async (id: number, data: UpdateSection) => {
	return await db
		.update(sections)
		.set(data)
		.where(eq(sections.id, id))
		.returning();
};

/**
 * Deletes a section by its ID from the database.
 *
 * @param {number} id - The ID of the section to delete
 * @return {Promise<void>} The result of the deletion operation
 */
const deleteSection = async (id: number) => {
	return await db.delete(sections).where(eq(sections.id, id)).execute();
};

export default {
	findAllSections,
	findSectionById,
	findSectionByName,
	insertSection,
	updateSection,
	deleteSection,
};
