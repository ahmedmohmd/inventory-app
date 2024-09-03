import { RequestHandler } from "express";
import { HttpStatusCode } from "../common/enums/http-status-code.enum";
import categoryService from "./categories.service";

/**
 * Retrieves a single category by its ID.
 *
 * @param {object} params - The request parameters containing the category ID.
 * @return {object} An object containing the retrieved category.
 */
const getSingleCategory: RequestHandler = async ({ params }, res) => {
	res
		.status(HttpStatusCode.OK)
		.json(await categoryService.findCategoryById(Number(params.id)));
};

/**
 * Retrieves all categories from the database.
 *
 * @return {object[]} An array of category objects.
 */
const getAllCategories: RequestHandler = async (__, res) => {
	const categories = await categoryService.findAllCategories();

	res.status(HttpStatusCode.OK).json(categories);
};

/**
 * Updates a category in the database.
 *
 * @param {object} body - The updated category data.
 * @param {object} params - The request parameters containing the category ID.
 * @return {void} A Promise that resolves when the category is updated.
 */
const updateCategory: RequestHandler = async ({ body, params }, res) => {
	const categoryId = Number(params.id);

	await categoryService.updateCategory(categoryId, body);

	res.status(HttpStatusCode.CREATED).send();
};

/**
 * Creates a new category by inserting it into the database.
 *
 * @param {object} body - The request body containing the new category data.
 * @return {object} The newly created category object.
 */
const createCategory: RequestHandler = async ({ body }, res) => {
	const createdCategory = await categoryService.insertCategory(body);

	res.status(HttpStatusCode.CREATED).json(createdCategory);
};

/**
 * Deletes a category from the database.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} A Promise that resolves when the category is deleted.
 */
const deleteCategory: RequestHandler = async ({ params }, res) => {
	const categoryId = Number(params.id);

	await categoryService.deleteCategory(categoryId);

	res.status(HttpStatusCode.NO_CONTENT).send();
};

export default {
	createCategory,
	deleteCategory,
	getAllCategories,
	getSingleCategory,
	updateCategory,
};
