import createHttpError from "http-errors";
import { findCategoryById } from "../categories/categories.service";
import { uploadImage } from "../common/utils/cloudinary-service.util";
import { findSupplierById } from "../suppliers/suppliers.service";
import { insertProductScreenshot } from "./products-screenshots.repository";
import * as productsRepository from "./products.repository";
import { CreateProduct, UpdateProduct } from "./products.types";

const MAX_IMAGES = 4;

export const findAllProducts = async () => {
	return await productsRepository.findAllProducts();
};

export const findProductById = async (id: number) => {
	return await productsRepository.findProductById(id);
};

export const insertProduct = async (
	productData: CreateProduct,
	images: Express.Multer.File[]
) => {
	const targetCategory = await findCategoryById(productData.categoryId);

	if (!targetCategory) {
		throw new createHttpError.BadRequest("Category not found");
	}

	if (images.length > MAX_IMAGES) {
		throw new createHttpError.BadRequest("You can only upload up to 4 images");
	}

	const supplier = await findSupplierById(productData.supplierId);

	if (!supplier) {
		throw new createHttpError.BadRequest("Supplier not found");
	}

	// check section

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
	return await productsRepository.deleteProduct(id);
};
