import createHttpError from "http-errors";
import * as categoriesRepository from "./categories.repository";
import { CreateCategory, UpdateCategory } from "./categories.types";

const findCategoryById = async (id: number) => {
	const targetCategory = await categoriesRepository.findCategoryById(id);

	if (!targetCategory) {
		throw new createHttpError.NotFound(`Category ${id} not found )`);
	}

	return targetCategory;
};

const findAllCategories = async () => {
	return await categoriesRepository.findAllCategories();
};

const insertCategory = async (categoryData: CreateCategory) => {
	const targetCategory = await categoriesRepository.findCategoryByName(
		categoryData.name
	);

	if (targetCategory) {
		throw new createHttpError.BadRequest(
			`Category ${categoryData.name} is already Exists.`
		);
	}

	return await categoriesRepository.insertCategory(categoryData);
};

const updateCategory = async (id: number, categoryData: UpdateCategory) => {
	const targetCategory = await categoriesRepository.findCategoryById(id);

	if (!targetCategory) {
		throw new createHttpError.NotFound(`Category ${id} not found )`);
	}

	return await categoriesRepository.updateCategory(id, categoryData);
};

const deleteCategory = async (id: number) => {
	const targetCategory = await categoriesRepository.findCategoryById(id);

	if (!targetCategory) {
		throw new createHttpError.NotFound(`Category ${id} not found )`);
	}

	return await categoriesRepository.deleteCategory(id);
};

export {
	deleteCategory,
	findAllCategories,
	findCategoryById,
	insertCategory,
	updateCategory,
};
