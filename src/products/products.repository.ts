import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import { categories } from "../db/schema/category.schema";
import { productScreenshots } from "../db/schema/product-screenshot.schema";
import { products } from "../db/schema/product.schema";
import { sections } from "../db/schema/section.schema";
import { suppliers } from "../db/schema/supplier.schema";
import { CreateProduct, UpdateProduct } from "./products.types";

export const findAllProducts = async () => {
	const result = await db
		.select({
			id: products.id,
			name: products.name,
			description: products.description,
			price: products.price,
			sku: products.sku,
			quantity: products.qty,

			sectionName: sections.name,
			categoryName: categories.name,
			supplierName: suppliers.name,
			screenshots: sql`array_agg(${productScreenshots.url})`.as("screenshots"),
		})
		.from(products)
		.leftJoin(sections, eq(products.categoryId, sections.id))
		.leftJoin(categories, eq(products.categoryId, categories.id))
		.leftJoin(suppliers, eq(products.supplierId, suppliers.id))
		.leftJoin(productScreenshots, eq(products.id, productScreenshots.productId))
		.groupBy(products.id, sections.name, categories.name, suppliers.name);

	return result;
};

export const findProductById = async (id: number) => {
	const result = await db
		.select({
			id: products.id,
			name: products.name,
			description: products.description,
			price: products.price,
			sku: products.sku,
			quantity: products.qty,

			sectionName: sections.name,
			categoryName: categories.name,
			supplierName: suppliers.name,
			supplierId: suppliers.id,
			screenshots: sql`array_agg(${productScreenshots.url})`.as("screenshots"),
		})
		.from(products)
		.leftJoin(sections, sql`${products.sectionId} = ${sections.id}`)
		.leftJoin(categories, sql`${products.categoryId} = ${categories.id}`)
		.leftJoin(suppliers, sql`${products.supplierId} = ${suppliers.id}`)
		.leftJoin(
			productScreenshots,
			sql`${products.id} = ${productScreenshots.productId}`
		)
		.where(sql`${products.id} = ${id}`)
		.groupBy(
			products.id,
			sections.name,
			categories.name,
			suppliers.name,
			suppliers.id
		)
		.limit(1);

	return result[0] || null;
};

export const insertProduct = async (productData: CreateProduct) => {
	const createdProduct = await db
		.insert(products)
		.values(productData as any) // eslint-disable-line
		.returning();

	return createdProduct[0];
};

export const updateProduct = async (id: number, productData: UpdateProduct) => {
	return await db
		.update(products)
		.set(productData as any) // eslint-disable-line
		.where(eq(products.id, id))
		.returning();
};

export const deleteProduct = async (id: number) => {
	return await db.delete(products).where(eq(products.id, id)).execute();
};
