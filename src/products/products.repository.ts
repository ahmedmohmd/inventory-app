import { and, asc, DBQueryConfig, desc, eq, SQL } from "drizzle-orm";
import { db } from "../db";
import { products } from "../db/schema/product.schema";
import {
	CreateProduct,
	FindAllProductsQuery,
	UpdateProduct,
} from "./products.types";
import { config } from "../../config/config";
import { OrderBy } from "./products.enum";

/**
 * Retrieves a list of products based on the provided query parameters.
 *
 * @param {FindAllProductsQuery} query - The query parameters to filter products by.
 * @return {Promise<unknown[]>} An array of products that match the query parameters.
 */
const findAllProducts = async (query: FindAllProductsQuery) => {
	const page = Number(query.page) || config.pagination.page;
	const limit = Number(query.limit) || config.pagination.limit;
	const supplierId = Number(query.supplierId);
	const categoryId = Number(query.categoryId);
	const sectionId = Number(query.sectionId);

	const { status } = query;

	const andConditions: SQL<unknown>[] = [];

	const queryOptions: DBQueryConfig = {
		with: {
			category: {
				columns: {
					name: true,
				},
			},
			section: {
				columns: {
					name: true,
				},
			},
			supplier: {
				columns: {
					name: true,
				},
			},
			screenshots: {
				columns: {
					url: true,
				},
			},
		},

		limit: limit,
		offset: (page - 1) * limit,
	};

	if (supplierId) {
		andConditions.push(eq(products.supplierId, supplierId));
	}

	if (categoryId) {
		andConditions.push(eq(products.categoryId, categoryId));
	}

	if (sectionId) {
		andConditions.push(eq(products.sectionId, sectionId));
	}

	if (status) {
		andConditions.push(eq(products.status, status));
	}

	if (query.sortBy) {
		if (query.sortBy && query.orderBy === OrderBy.DESC) {
			queryOptions.orderBy = [desc(products[query.sortBy])];
		} else {
			queryOptions.orderBy = [asc(products[query.sortBy])];
		}
	}

	queryOptions.where = and(...andConditions);

	const allPproducts = await db.query.products.findMany(queryOptions);

	return allPproducts;
};

/**
 * Retrieves a product by its ID, including its category, section, supplier, and screenshots.
 *
 * @param {number} id - The ID of the product to retrieve.
 * @return {Promise<unknown>} The product data, or null if not found.
 */
const findProductById = async (id: number) => {
	const product = await db.query.products.findFirst({
		where: eq(products.id, id),

		with: {
			category: true,
			section: true,
			supplier: true,
			screenshots: true,
			stocks: true,
		},
	});

	return product;
};

/**
 * Inserts a new product into the database.
 *
 * @param {CreateProduct} productData - The product data to be inserted.
 * @return {unknown} The created product data.
 */
const insertProduct = async (productData: CreateProduct) => {
	const [createdProduct] = await db
		.insert(products)
		.values(productData)
		.returning();

	const product = await db.query.products.findFirst({
		where: eq(products.id, createdProduct.id),

		with: {
			category: true,
			section: true,
			supplier: true,
			screenshots: true,
			stocks: true,
		},
	});

	return product;
};

/**
 * Updates a product in the database by its ID.
 *
 * @param {number} id - The ID of the product to update.
 * @param {UpdateProduct} productData - The updated product data.
 * @return {unknown} The updated product data.
 */
const updateProduct = async (id: number, productData: UpdateProduct) => {
	const [updatedProduct] = await db
		.update(products)
		.set(productData)
		.where(eq(products.id, id))
		.returning();

	return updatedProduct;
};

/**
 * Deletes a product from the database by its ID.
 *
 * @param {number} id - The ID of the product to be deleted.
 * @return {unknown} The deleted product data.
 */
const deleteProduct = async (id: number) => {
	const [deletedProduct] = await db
		.delete(products)
		.where(eq(products.id, id))
		.returning();

	return deletedProduct;
};

export default {
	findAllProducts,
	findProductById,
	insertProduct,
	updateProduct,
	deleteProduct,
};
