import createHttpError from "http-errors";
import categoriesRepository from "./categories.repository";
import { CreateCategory, UpdateCategory } from "./categories.types";
import logger from "../logging";
import handleCache from "../common/utils/handle-cache.util";
import cache from "../cache";

/**
 * Retrieves a category by its ID.
 *
 * @param {number} id - The ID of the category to retrieve.
 * @return {object} The category object if found, otherwise throws a NotFound error.
 */
const findCategoryById = async (id: number) => {
	const category = await handleCache(
		`category:${id}`,
		async () => await categoriesRepository.findCategoryById(id)
	);

	if (!category) {
		logger.error.error(`Category with ID: ${id} not found.`);
		throw new createHttpError.NotFound(`Category with ID: ${id} not found )`);
	}

	return category;
};

/**
 * Retrieves all categories from the database.
 *
 * @return {object[]} An array of category objects.
 */
const findAllCategories = async () => {
	const CACHE_DURATION = 2592000;

	const categories = await handleCache(
		`categories`,
		categoriesRepository.findAllCategories,
		CACHE_DURATION
	);

	return categories;
};

/**
 * Inserts a new category into the database.
 *
 * @param {CreateCategory} data - The data for the new category to be inserted.
 * @return {object} The newly created category object.
 */
const insertCategory = async (data: CreateCategory) => {
	const category = await categoriesRepository.findCategoryByName(data.name);

	if (category) {
		logger.error.error(`Category with ID: ${category.id} already Exists.`);

		throw new createHttpError.BadRequest(
			`Category ${data.name} is already Exists.`
		);
	}

	return await categoriesRepository.insertCategory(data);
};

/**
 * Updates a category in the database by its ID.
 *
 * @param {number} id - The ID of the category to be updated.
 * @param {UpdateCategory} data - The updated category data.
 * @return {object} The updated category object.
 */
const updateCategory = async (id: number, data: UpdateCategory) => {
	const category = await categoriesRepository.findCategoryById(id);

	if (!category) {
		logger.error.error(`Category with ID: ${id} not found.`);
		throw new createHttpError.NotFound(`Category with ID: ${id} not found.`);
	}

	const [updatedCategory] = await categoriesRepository.updateCategory(id, data);

	await cache.service.removeFromCache(`category:${id}`);
	await cache.service.addToCache(
		`category:${id}`,
		JSON.stringify(updatedCategory)
	);

	return updatedCategory;
};

/**
 * Deletes a category from the database by its ID.
 *
 * @param {number} id - The ID of the category to be deleted.
 * @return {object} The deleted category object.
 */
const deleteCategory = async (id: number) => {
	const category = await categoriesRepository.findCategoryById(id);

	if (!category) {
		logger.error.error(`Category with ID: ${id} not found.`);
		throw new createHttpError.NotFound(`Category with ID: ${id} not found )`);
	}

	const deletedCategory = await categoriesRepository.deleteCategory(id);

	await cache.service.removeFromCache(`category:${id}`);

	return deletedCategory;
};

export default {
	deleteCategory,
	findAllCategories,
	findCategoryById,
	insertCategory,
	updateCategory,
};
