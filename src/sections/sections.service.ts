import createHttpError from "http-errors";
import { CreateSection } from "./section.types";
import sectionsRepository from "./sections.repository";

/**
 * Retrieves all sections from the database.
 *
 * @return {Promise<Section[]>} A promise resolving to an array of sections
 */
const findAllSections = async () => {
	return await sectionsRepository.findAllSections();
};

/**
 * Retrieves a section by its ID from the database.
 *
 * @param {number} id - The ID of the section to retrieve
 * @return {Promise<object>} The section object if found, otherwise throws an error
 */
const findSectionById = async (id: number) => {
	const section = await sectionsRepository.findSectionById(id);

	if (!section) {
		throw new createHttpError.NotFound(`Section with ID: ${id} not Found.`);
	}

	return await sectionsRepository.findSectionById(id);
};

/**
 * Inserts a new section into the database.
 *
 * @param {CreateSection} data - The section data to be inserted
 * @return {Promise<object>} The newly inserted section object
 */
const insertSection = async (data: CreateSection) => {
	const section = await sectionsRepository.findSectionByName(data.name);

	if (section) {
		throw new createHttpError.BadRequest(
			` Section with Name: ${data.name} already Exists.`
		);
	}

	return await sectionsRepository.insertSection(data);
};

/**
 * Updates a section in the database with the given ID.
 *
 * @param {number} id - The ID of the section to update.
 * @param {CreateSection} data - The updated section data.
 * @return {Promise<CreateSection>} A promise that resolves to the updated section data.
 * @throws {createHttpError.NotFound} If the section with the given ID is not found.
 */
const updateSection = async (id: number, data: CreateSection) => {
	const section = await sectionsRepository.findSectionById(id);

	if (!section) {
		throw new createHttpError.NotFound(`Section with ID: ${id} not Found.`);
	}

	return await sectionsRepository.updateSection(id, data);
};

/**
 * Deletes a section from the database by its ID.
 *
 * @param {number} id - The ID of the section to delete.
 * @return {Promise<void>} A Promise that resolves when the section is deleted.
 * @throws {createHttpError.NotFound} If the section with the given ID is not found.
 */
const deleteSection = async (id: number) => {
	const section = await sectionsRepository.findSectionById(id);

	if (!section) {
		throw new createHttpError.NotFound(`Section with ID: ${id} not Found.`);
	}

	return await sectionsRepository.deleteSection(id);
};

export default {
	findAllSections,
	findSectionById,
	insertSection,
	updateSection,
	deleteSection,
};
