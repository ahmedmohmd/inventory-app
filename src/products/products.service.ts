import createHttpError from "http-errors";
import categories from "../categories";
import { uploadImage } from "../common/utils/cloudinary-service.util";
import { removeImage } from "../common/utils/image-upload";
import sections from "../sections";
import { findSupplierById } from "../suppliers/suppliers.service";
import {
	deleteProductScreenshots,
	findAllProductScreenshots,
	insertProductScreenshot,
} from "./products-screenshots.repository";
import * as productsRepository from "./products.repository";
import { CreateProduct, UpdateProduct } from "./products.types";

const MAX_IMAGES = 4;

export const findAllProducts = async () => {
	return await productsRepository.findAllProducts();
};

export const findProductById = async (id: number) => {
	const targetProduct = await productsRepository.findProductById(id);

	if (!targetProduct) {
		throw new createHttpError.NotFound("Product not found");
	}

	return targetProduct;
};

export const insertProduct = async (
	productData: CreateProduct,
	images: Express.Multer.File[]
) => {
	const targetCategory = await categories.service.findCategoryById(
		productData.categoryId
	);
	if (!targetCategory) {
		throw new createHttpError.BadRequest("Category not found");
	}

	const supplier = await findSupplierById(productData.supplierId);
	if (!supplier) {
		throw new createHttpError.BadRequest("Supplier not found");
	}

	const targetSection = await sections.service.findSectionById(
		productData.sectionId
	);
	if (!targetSection) {
		throw new createHttpError.BadRequest("Section not found");
	}

	if (images.length > MAX_IMAGES) {
		throw new createHttpError.BadRequest("You can only upload up to 4 images");
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

export const updateProduct = async (id: number, productData: UpdateProduct) => {
	const targetProduct = await productsRepository.findProductById(id);

	if (!targetProduct) {
		throw new createHttpError.BadRequest("Product not found");
	}

	return await productsRepository.updateProduct(id, productData);
};

export const deleteProduct = async (id: number) => {
	const targetProduct = await productsRepository.findProductById(id);

	if (!targetProduct) {
		throw new createHttpError.BadRequest("Product not found");
	}

	const productScreenshots = await findAllProductScreenshots(targetProduct.id);

	if (productScreenshots.length > 0) {
		for (const screenshot of productScreenshots) {
			await removeImage(screenshot.publicId); //eslint-disable-line
		}
	}

	await deleteProductScreenshots(targetProduct.id);

	return await productsRepository.deleteProduct(id);
};
