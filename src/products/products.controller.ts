import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as productsService from "./products.service";

export const getAllProducts: RequestHandler = async (req, res) => {
	const allProducts = await productsService.findAllProducts();

	return res.status(StatusCodes.OK).json(allProducts);
};

export const getSingleProduct: RequestHandler = async ({ params }, res) => {
	const targetProduct = await productsService.findProductById(
		Number(params.id)
	);

	res.status(StatusCodes.OK).json(targetProduct);
};

export const createProduct: RequestHandler = async (req, res) => {
	const productData = req.body;
	const productImages = req.files as Express.Multer.File[];

	const createdProduct = await productsService.insertProduct(
		productData,
		productImages
	);

	return res.status(StatusCodes.CREATED).json(createdProduct);
};

export const updateProduct: RequestHandler = async (req, res) => {
	const { id } = req.params;
	const productData = req.body;

	const updatedProduct = await productsService.updateProduct(
		Number(id),
		productData
	);

	return res.status(StatusCodes.CREATED).json(updatedProduct);
};

export const deleteProduct: RequestHandler = async (req, res) => {
	const { id } = req.params;

	await productsService.deleteProduct(Number(id));

	return res.status(StatusCodes.NO_CONTENT);
};
