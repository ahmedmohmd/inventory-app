import { eq } from "drizzle-orm";
import { db } from "../db";
import { categories } from "../db/schema/category.schema";
import { CreateCategory, UpdateCategory } from "./categories.types";
import { CategoryName } from "./categories.enum";

/**
 * Retrieves a category by its ID.
 *
 * @param {number} id - The ID of the category to retrieve.
 * @return {Promise<object | null>} The category object if found, otherwise null.
 */
const findCategoryById = async (id: number) => {
	return await db.query.categories.findFirst({
		where: eq(categories.id, id),
	});
};

/**
 * Retrieves a category by its name.
 *
 * @param {CategoryName} name - The name of the category to retrieve.
 * @return {Promise<object | null>} The category object if found, otherwise null.
 */
const findCategoryByName = async (name: CategoryName) => {
	return await db.query.categories.findFirst({
		where: eq(categories.name, name),
	});
};

/**
 * Retrieves all categories.
 *
 * @return {Promise<object[]>} An array of category objects.
 */
const findAllCategories = async () => {
	return await db.select().from(categories);
};

/**
 * Inserts a new category into the database.
 *
 * @param {CreateCategory} categoryData - The data for the new category to be inserted.
 * @return {object} The newly created category object.
 */
const insertCategory = async (categoryData: CreateCategory) => {
	const createdCategory = await db
		.insert(categories)
		.values(categoryData)
		.returning();

	return createdCategory[0];
};

/**
 * Updates a category by its id.
 *
 * @param {number} id - The id of the category to be updated.
 * @param {UpdateCategory} data - The updated category data.
 * @return {object} The updated category object.
 */
const updateCategory = async (id: number, data: UpdateCategory) => {
	return await db.update(categories).set(data).returning();
};

/**
 * Deletes a category from the database by its id.
 *
 * @param {number} id - The id of the category to be deleted.
 * @return {Promise<object | null>} The deleted category object if found, otherwise null.
 */
const deleteCategory = async (id: number) => {
	return await db.delete(categories).where(eq(categories.id, id)).execute();
};

export default {
	deleteCategory,
	findAllCategories,
	findCategoryById,
	findCategoryByName,
	insertCategory,
	updateCategory,
};
