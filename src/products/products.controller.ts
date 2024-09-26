import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import productsService from "./products.service";

/**
 * Retrieves a list of all products based on the provided query parameters.
 *
 * @param {object} query - The query parameters to filter products by.
 * @return {object} An object containing a list of products.
 */
const getAllProducts: RequestHandler = async ({ query }, res) => {
	const products = await productsService.findAllProducts(query);

	return res.status(StatusCodes.OK).json(products);
};

/**
 * Retrieves a product by its ID.
 *
 * @param {object} params - The request parameters containing the product ID.
 * @return {object} An object containing the retrieved product.
 */
const getSingleProduct: RequestHandler = async ({ params }, res) => {
	const { id } = params;

	const product = await productsService.findProductById(Number(id));

	return res.status(StatusCodes.OK).json(product);
};

/**
 * Creates a new product by inserting it into the database.
 *
 * @param {object} req - The Express request object containing the product data and images.
 * @param {object} res - The Express response object used to send the newly created product data.
 * @return {object} An object containing the newly created product data.
 */
const createProduct: RequestHandler = async (req, res) => {
	const productData = req.body;
	const productImages = req.files as Express.Multer.File[];

	const createdProduct = await productsService.insertProduct(
		productData,
		productImages
	);

	return res.status(StatusCodes.CREATED).json(createdProduct);
};

/**
 * Updates a product by its ID.
 *
 * @param {object} req - The Express request object containing the product ID and updated product data.
 * @param {object} res - The Express response object used to send the result of the update operation.
 * @return {void} No data is returned, but a CREATED status code is sent to indicate success.
 */
const updateProduct: RequestHandler = async (req, res) => {
	const { id } = req.params;
	const productData = req.body;

	await productsService.updateProduct(Number(id), productData);

	return res.status(StatusCodes.CREATED).send();
};

/**
 * Deletes a product from the database.
 *
 * @param {object} req - The Express request object containing the product ID as a path parameter.
 * @param {object} res - The Express response object used to send the response.
 * @return {void} No data is returned, but a NO_CONTENT status code is sent to indicate success.
 */
const deleteProduct: RequestHandler = async (req, res) => {
	const { id } = req.params;

	await productsService.deleteProduct(Number(id));

	return res.status(StatusCodes.NO_CONTENT).send();
};

const searchProducts: RequestHandler = async ({ query }, res) => {
	if (!query?.search) {
		return res.status(StatusCodes.OK).json([]);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const products = await productsService.searchProducts(query as any);

	return res.status(StatusCodes.OK).json(products);
};

export default {
	getAllProducts,
	getSingleProduct,
	createProduct,
	updateProduct,
	deleteProduct,
	searchProducts,
};
