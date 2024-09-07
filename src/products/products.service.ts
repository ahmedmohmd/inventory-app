import createHttpError from "http-errors";
import categories from "../categories";
import { uploadImage } from "../common/utils/cloudinary-service.util";
import { removeImage } from "../common/utils/image-upload";
import sections from "../sections";
import logger from "../logging";
import {
	deleteProductScreenshots,
	findAllProductScreenshots,
	insertProductScreenshot,
} from "./products-screenshots.repository";
import productsRepository from "./products.repository";
import {
	CreateProduct,
	FindAllProductsQuery,
	UpdateProduct,
} from "./products.types";
import suppliers from "../suppliers";

const MAX_IMAGES = 4;

/**
 * Retrieves a list of products based on the provided query parameters.
 *
 * @param {FindAllProductsQuery} query - The query parameters to filter products by.
 * @return {Promise<unknown[]>} An array of products that match the query parameters.
 */
const findAllProducts = async (query: FindAllProductsQuery) => {
	const products = await productsRepository.findAllProducts(query);

	return products;
};

/**
 * Retrieves a product by its ID.
 *
 * @param {number} id - The ID of the product to retrieve.
 * @return {Promise<unknown>} The product data, or throws a NotFound error if not found.
 */
const findProductById = async (id: number) => {
	const product = await productsRepository.findProductById(id);

	if (!product) {
		logger.errors.error(`Product with ID: ${id} not found.`);

		throw new createHttpError.NotFound(`Product with ID: ${id} not found.`);
	}

	return product;
};

/**
 * Inserts a new product into the database, including its category, supplier, section, and images.
 *
 * @param {CreateProduct} productData - The data for the new product to be inserted.
 * @param {Express.Multer.File[]} images - The images to be uploaded for the new product.
 * @return {Promise<unknown>} The newly inserted product object.
 */
const insertProduct = async (
	productData: CreateProduct,
	images: Express.Multer.File[]
) => {
	const category = await categories.service.findCategoryById(
		productData.categoryId
	);

	if (!category) {
		logger.errors.error(
			`Category with ID: ${productData.categoryId} not found.`
		);

		throw new createHttpError.BadRequest(
			`Category with ID: ${productData.categoryId} not found.`
		);
	}

	const supplier = await suppliers.service.findSupplierById(
		productData.supplierId
	);
	if (!supplier) {
		logger.errors.error(
			`Supplier with ID: ${productData.supplierId} not found.`
		);

		throw new createHttpError.BadRequest(
			`Supplier with ID: ${productData.supplierId} not found.`
		);
	}

	const section = await sections.service.findSectionById(productData.sectionId);
	if (!section) {
		logger.errors.error(`Section with ID: ${productData.sectionId} not found.`);

		throw new createHttpError.BadRequest(
			`Section with ID: ${productData.sectionId} not found.`
		);
	}

	if (images.length > MAX_IMAGES) {
		logger.errors.error(`You can only upload up to 4 images.`);

		throw new createHttpError.BadRequest("You can only upload up to 4 images.");
	}

	const createdProduct = await productsRepository.insertProduct(productData);

	for (const file of images) {
		const uploadedImage = await uploadImage(file, "products-images"); //eslint-disable-line

		if (uploadedImage) {
			insertProductScreenshot({
				productId: createdProduct.id,
				url: uploadedImage?.secure_url,
				publicId: uploadedImage?.public_id,
			});
		}
	}

	return createdProduct;
};

/**
 * Updates a product in the database by its ID.
 *
 * @param {number} id - The ID of the product to update.
 * @param {UpdateProduct} productData - The updated product data.
 * @return {unknown} The updated product data.
 */
const updateProduct = async (id: number, productData: UpdateProduct) => {
	const product = await productsRepository.findProductById(id);

	if (!product) {
		logger.errors.error(`Product with ID: ${id} not found.`);

		throw new createHttpError.NotFound(`Product with ID: ${id} not found.`);
	}

	return await productsRepository.updateProduct(id, productData);
};

/**
 * Deletes a product in the database by its ID, including its screenshots.
 *
 * @param {number} id - The ID of the product to delete.
 * @return {unknown} The deleted product data.
 */
const deleteProduct = async (id: number) => {
	const product = await productsRepository.findProductById(id);

	if (!product) {
		logger.errors.error(`Product with ID: ${id} not found.`);

		throw new createHttpError.NotFound(`Product with ID: ${id} not found.`);
	}

	const productScreenshots = await findAllProductScreenshots(product.id);

	const deleteScreenshotPromises = productScreenshots.map(async (screenshot) =>
		removeImage(screenshot.publicId)
	);

	if (productScreenshots.length > 0) {
		await Promise.all(deleteScreenshotPromises);
		await deleteProductScreenshots(product.id);
	}

	return await productsRepository.deleteProduct(id);
};

export default {
	findAllProducts,
	findProductById,
	insertProduct,
	updateProduct,
	deleteProduct,
};
