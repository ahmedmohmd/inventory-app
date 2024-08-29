import { eq } from "drizzle-orm";
import { db } from "../db";
import { categories } from "../db/schema/category.schema";
import { productScreenshots } from "../db/schema/product-screenshot.schema";
import { products } from "../db/schema/product.schema";
import { sections } from "../db/schema/section.schema";
import { suppliers } from "../db/schema/supplier.schema";
import { CreateProduct, UpdateProduct } from "./products.types";

const findAllProducts = async () => {
	return await db
		.select()
		.from(products)
		.innerJoin(categories, eq(products.categoryId, categories.id))
		.innerJoin(suppliers, eq(products.supplierId, suppliers.id))
		.innerJoin(
			productScreenshots,
			eq(products.id, productScreenshots.productId)
		)
		.innerJoin(sections, eq(products.sectionId, sections.id));
};

const findProductById = async (id: number) => {
	return await db.query.suppliers.findFirst({
		where: eq(products.id, id),
		with: {
			categories: true,
			supplier: true,
			section: true,
			productScreenshots: true,
		},
	});
};

const insertProduct = async (productData: CreateProduct) => {
	const createdProduct = await db
		.insert(products)
		.values(productData as any) // eslint-disable-line
		.returning();

	return createdProduct[0];
};

const updateProduct = async (id: number, productData: UpdateProduct) => {
	return await db
		.update(products)
		.set(productData as any) // eslint-disable-line
		.where(eq(products.id, id))
		.returning();
};

const deleteProduct = async (id: number) => {
	return await db.delete(products).where(eq(products.id, id)).execute();
};

export {
	deleteProduct,
	findAllProducts,
	findProductById,
	insertProduct,
	updateProduct,
};
