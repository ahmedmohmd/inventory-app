import createHttpError from "http-errors";
import { CreateSection, UpdateSection } from "./section.types";
import sectionsRepository from "./sections.repository";
import logger from "../logging";
import handleCache from "../common/utils/handle-cache.util";
import cache from "../cache";

/**
 * Retrieves all sections from the database.
 *
 * @return {Promise<Section[]>} A promise resolving to an array of sections
 */
const findAllSections = async () => {
	const MINUTES = 60;
	const SECONDS = 60;
	const HOURS = SECONDS * MINUTES;
	const CACHE_DURATION = SECONDS * MINUTES * HOURS;

	const sections = await handleCache(
		`sections`,
		sectionsRepository.findAllSections,
		CACHE_DURATION
	);

	return sections;
};

/**
 * Retrieves a section by its ID from the database.
 *
 * @param {number} id - The ID of the section to retrieve
 * @return {Promise<object>} The section object if found, otherwise throws an error
 */
const findSectionById = async (id: number) => {
	const section = await handleCache(
		`section:${id}`,
		async () => await sectionsRepository.findSectionById(id)
	);

	if (!section) {
		logger.error.error(`Section with ID: ${id} not Found.`);

		throw new createHttpError.NotFound(`Section with ID: ${id} not Found.`);
	}

	return section;
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
		logger.error.error(`Section with Name: ${data.name} already Exists.`);

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
const updateSection = async (id: number, data: UpdateSection) => {
	const section = await sectionsRepository.findSectionById(id);

	if (!section) {
		logger.error.error(`Section with ID: ${id} not Found.`);

		throw new createHttpError.NotFound(`Section with ID: ${id} not Found.`);
	}

	const [updatedSection] = await sectionsRepository.updateSection(id, data);

	await cache.service.removeFromCache(`section:${id}`);
	await cache.service.addToCache(
		`section:${id}`,
		JSON.stringify(updatedSection)
	);

	return updatedSection;
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
		logger.error.error(`Section with ID: ${id} not Found.`);

		throw new createHttpError.NotFound(`Section with ID: ${id} not Found.`);
	}

	const deletedProduct = await sectionsRepository.deleteSection(id);

	await cache.service.removeFromCache(`section:${id}`);

	return deletedProduct;
};

export default {
	findAllSections,
	findSectionById,
	insertSection,
	updateSection,
	deleteSection,
};
