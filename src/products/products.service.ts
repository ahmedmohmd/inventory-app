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
	SearchProductsQuery,
	UpdateProduct,
} from "./products.types";
import suppliers from "../suppliers";
import elasticSearch from "../elastic-search";
import { config } from "../../config/config";
import stocks from "../stocks";
import warehouses from "../warehouses";

const MAX_IMAGES = 4;

/**
 * Retrieves a list of products based on the provided query parameters.
 *
 * @param {FindAllProductsQuery} query - The query parameters to filter products by.
 * @return {Promise<unknown[]>} An array of products that match the query parameters.
 */

// ? @deprecated
// ? Old Implementation of findAllProducts
//? get all data from main database
// const findAllProducts = async (query: FindAllProductsQuery) => {
// 	const products = await productsRepository.findAllProducts(query);

// 	return products;
// };

const findAllProducts = async (query: FindAllProductsQuery) => {
	// const products = await productsRepository.findAllProducts(query);

	const currentPage = Number(query.page) || config.pagination.page;
	const pageSize = Number(query.limit) || config.pagination.limit;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const elasticQueryOptions: any = {
		bool: {
			must: [],
		},
	};

	if (query.minPrice || query.maxPrice) {
		if (!query.minPrice) {
			elasticQueryOptions.bool.must.push({
				range: {
					price: {
						lte: Number(query.maxPrice),
					},
				},
			});
		}

		if (!query.maxPrice) {
			elasticQueryOptions.bool.must.push({
				range: {
					price: {
						gte: Number(query.minPrice),
					},
				},
			});
		}

		if (query.minPrice && query.maxPrice) {
			elasticQueryOptions.bool.must.push({
				range: {
					price: {
						gte: Number(query.minPrice),
						lte: Number(query.maxPrice),
					},
				},
			});
		}
	}

	if (query.brand) {
		elasticQueryOptions.bool.must.push({
			term: {
				brand: query.brand,
			},
		});
	}

	if (query.color) {
		elasticQueryOptions.bool.must.push({
			term: {
				color: query.color,
			},
		});
	}

	if (query.status) {
		elasticQueryOptions.bool.must.push({
			term: {
				status: query.status,
			},
		});
	}

	if (query.sectionId) {
		elasticQueryOptions.bool.must.push({
			term: {
				sectionId: Number(query.sectionId),
			},
		});
	}

	if (query.categoryId) {
		elasticQueryOptions.bool.must.push({
			term: {
				categoryId: Number(query.categoryId),
			},
		});
	}

	if (query.supplierId) {
		elasticQueryOptions.bool.must.push({
			term: {
				supplierId: Number(query.supplierId),
			},
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const sortOptions: any = [];

	if (query.sortBy) {
		const sortOrder = query.orderBy === "desc" ? "desc" : "asc";

		if (typeof query.sortBy === "string") {
			sortOptions.push({
				[`${query.sortBy}.keyword`]: { order: sortOrder },
			});
		} else {
			sortOptions.push({
				[query.sortBy]: { order: sortOrder },
			});
		}
	} else {
		sortOptions.push({
			"name.keyword": { order: "asc" },
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const options: any = {
		index: "products",
		from: (currentPage - 1) * pageSize,
		size: pageSize,
		// filter_path: "hits.hits._source.name",
		sort: sortOptions,
	};

	if (elasticQueryOptions.bool.must.length > 0) {
		options.query = elasticQueryOptions;
	} else {
		options.query = {
			match_all: {},
		};
	}

	const result = await elasticSearch.client.search(options);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const final: any = {};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const totalCount = result.hits.total ? (result.hits.total as any).value : 0;
	const totalPages = Math.ceil(totalCount / pageSize);
	const nextPage = currentPage < totalPages ? currentPage + 1 : null;
	const prevPage = currentPage > 1 ? currentPage - 1 : null;

	final.data = result.hits ? result?.hits?.hits : [];
	final.pagination = {
		total_count: totalCount,
		total_pages: totalPages,
		current_page: currentPage,
		next_page: nextPage,
		prev_page: prevPage,
	};

	return final;
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
		logger.error.error(`Product with ID: ${id} not found.`);

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
		logger.error.error(
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
		logger.error.error(
			`Supplier with ID: ${productData.supplierId} not found.`
		);

		throw new createHttpError.BadRequest(
			`Supplier with ID: ${productData.supplierId} not found.`
		);
	}

	const section = await sections.service.findSectionById(productData.sectionId);
	if (!section) {
		logger.error.error(`Section with ID: ${productData.sectionId} not found.`);

		throw new createHttpError.BadRequest(
			`Section with ID: ${productData.sectionId} not found.`
		);
	}

	if (images.length > MAX_IMAGES) {
		logger.error.error(`You can only upload up to 4 images.`);

		throw new createHttpError.BadRequest("You can only upload up to 4 images.");
	}

	const createdProduct = await productsRepository.insertProduct(productData);

	if (!createdProduct) {
		logger.error.error(
			`Error while creating product with Name: ${productData.name}.`
		);

		throw new createHttpError.BadRequest(
			`Error while creating product with Name: ${productData.name}.`
		);
	}

	// Create all empty stocks in al warehouses
	const fetchedWarehouses = await warehouses.service.findAllWarehouses();

	const createStockspromises = fetchedWarehouses.map((warehouse) =>
		stocks.service.insertStock({
			productId: createdProduct.id,
			warehouseId: warehouse.id,
			quantity: 0,
		})
	);

	await Promise.all(createStockspromises);

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

	await elasticSearch.service.addToIndex(
		"products",
		(await productsRepository.findProductById(createdProduct.id))!,
		String(createdProduct.id)
	);

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
		logger.error.error(`Product with ID: ${id} not found.`);

		throw new createHttpError.NotFound(`Product with ID: ${id} not found.`);
	}

	const updatedProduct = await productsRepository.updateProduct(
		id,
		productData
	);

	if (!updatedProduct) {
		logger.error.error(`Error while updating product with ID: ${id}.`);

		throw new createHttpError.BadRequest(
			`Error while updating product with ID: ${id}.`
		);
	}

	await elasticSearch.service.updateIndex("products", String(id), {
		...productData,
		updatedAt: updatedProduct.updatedAt,
	});

	return updatedProduct;
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
		logger.error.error(`Product with ID: ${id} not found.`);

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

	const deletedProduct = await productsRepository.deleteProduct(id);

	if (!deletedProduct) {
		logger.error.error(`Error while deleting product with ID: ${id}.`);
		throw new createHttpError.BadRequest(
			`Error while deleting product with ID: ${id}.`
		);
	}

	await elasticSearch.service.deleteFromIndex(
		"products",
		String(deletedProduct.id)
	);

	return deletedProduct;
};

const searchProducts = async (query: SearchProductsQuery) => {
	const currentPage = Number(query.page) || config.pagination.page;
	const pageSize = Number(query.limit) || config.pagination.limit;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const elasticQueryOptions: any = {
		bool: {
			must: [
				{
					multi_match: {
						query: query.search || "",
						fields: ["name", "description"],
					},
				},
			],
		},
	};

	if (query.minPrice || query.maxPrice) {
		if (!query.minPrice) {
			elasticQueryOptions.bool.must.push({
				range: {
					price: {
						lte: Number(query.maxPrice),
					},
				},
			});
		}

		if (!query.maxPrice) {
			elasticQueryOptions.bool.must.push({
				range: {
					price: {
						gte: Number(query.minPrice),
					},
				},
			});
		}

		if (query.minPrice && query.maxPrice) {
			elasticQueryOptions.bool.must.push({
				range: {
					price: {
						gte: Number(query.minPrice),
						lte: Number(query.maxPrice),
					},
				},
			});
		}
	}

	if (query.brand) {
		elasticQueryOptions.bool.must.push({
			term: {
				brand: query.brand,
			},
		});
	}

	if (query.color) {
		elasticQueryOptions.bool.must.push({
			term: {
				color: query.color,
			},
		});
	}

	if (query.status) {
		elasticQueryOptions.bool.must.push({
			term: {
				status: query.status,
			},
		});
	}

	if (query.sectionId) {
		elasticQueryOptions.bool.must.push({
			term: {
				sectionId: Number(query.sectionId),
			},
		});
	}

	if (query.categoryId) {
		elasticQueryOptions.bool.must.push({
			term: {
				categoryId: Number(query.categoryId),
			},
		});
	}

	if (query.supplierId) {
		elasticQueryOptions.bool.must.push({
			term: {
				supplierId: Number(query.supplierId),
			},
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const sortOptions: any = [];

	if (query.sortBy) {
		const sortOrder = query.orderBy === "desc" ? "desc" : "asc";

		if (typeof query.sortBy === "string") {
			sortOptions.push({
				[`${query.sortBy}.keyword`]: { order: sortOrder },
			});
		} else {
			sortOptions.push({
				[query.sortBy]: { order: sortOrder },
			});
		}
	} else {
		sortOptions.push({
			"name.keyword": { order: "asc" },
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const options: any = {
		index: "products",
		from: (currentPage - 1) * pageSize,
		size: pageSize,
		// filter_path: "hits.hits._source.name",
		sort: sortOptions,
	};

	if (elasticQueryOptions.bool.must.length > 0) {
		options.query = elasticQueryOptions;
	} else {
		options.query = {
			match_all: {},
		};
	}

	const result = await elasticSearch.client.search(options);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const final: any = {};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const totalCount = result.hits.total ? (result.hits.total as any).value : 0;
	const totalPages = Math.ceil(totalCount / pageSize);
	const nextPage = currentPage < totalPages ? currentPage + 1 : null;
	const prevPage = currentPage > 1 ? currentPage - 1 : null;

	final.data = result.hits ? result?.hits?.hits : [];
	final.pagination = {
		total_count: totalCount,
		total_pages: totalPages,
		current_page: currentPage,
		next_page: nextPage,
		prev_page: prevPage,
	};

	return final;
};

export default {
	findAllProducts,
	findProductById,
	insertProduct,
	updateProduct,
	deleteProduct,
	searchProducts,
};
