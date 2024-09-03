import createHttpError from "http-errors";
import categoriesRepository from "./categories.repository";
import { CreateCategory, UpdateCategory } from "./categories.types";

/**
 * Retrieves a category by its ID.
 *
 * @param {number} id - The ID of the category to retrieve.
 * @return {object} The category object if found, otherwise throws a NotFound error.
 */
const findCategoryById = async (id: number) => {
	const category = await categoriesRepository.findCategoryById(id);

	if (!category) {
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
	return await categoriesRepository.findAllCategories();
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
		throw new createHttpError.NotFound(`Category with ID: ${id} not found )`);
	}

	return await categoriesRepository.updateCategory(id, data);
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
		throw new createHttpError.NotFound(`Category with ID: ${id} not found )`);
	}

	return await categoriesRepository.deleteCategory(id);
};

export default {
	deleteCategory,
	findAllCategories,
	findCategoryById,
	insertCategory,
	updateCategory,
};
