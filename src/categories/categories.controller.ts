import { RequestHandler } from "express";
import { HttpStatusCode } from "../common/enums/http-status-code.enum";
import * as categoryService from "./categories.service";

const getSingleCategory: RequestHandler = async ({ params }, res) => {
	res
		.status(HttpStatusCode.OK)
		.json(await categoryService.findCategoryById(Number(params.id)));
};

const getAllCategories: RequestHandler = async (req, res) => {
	res.status(HttpStatusCode.OK).json(await categoryService.findAllCategories());
};

const updateCategory: RequestHandler = async ({ body, params }, res) => {
	await categoryService.updateCategory(Number(params.id), body);

	res.status(HttpStatusCode.CREATED).json({
		message: "Category updated successfully.",
	});
};

const createCategory: RequestHandler = async ({ body }, res) => {
	const createdCategory = await categoryService.insertCategory(body);

	res.status(HttpStatusCode.CREATED).json(createdCategory);
};

const deleteCategory: RequestHandler = async ({ params }, res) => {
	await categoryService.deleteCategory(Number(params.id));

	res.status(HttpStatusCode.NO_CONTENT).json({
		message: "Category deleted successfully.",
	});
};

export {
	createCategory,
	deleteCategory,
	getAllCategories,
	getSingleCategory,
	updateCategory,
};
