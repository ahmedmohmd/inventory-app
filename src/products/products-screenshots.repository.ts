import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { productScreenshots } from "../db/schema/product-screenshot.schema";
import { CreateProductScreenshot } from "./product-screenshots.types";

export const findAllProductScreenshots = async (productId: number) => {
	return await db.query.productScreenshots.findMany({
		where: eq(productScreenshots.productId, productId),
	});
};

export const findProductScreenshotById = async (
	productId: number,
	screenshotId: number
) => {
	return await db.query.productScreenshots.findFirst({
		where: and(
			eq(productScreenshots.productId, productId),
			eq(productScreenshots.id, screenshotId)
		),
	});
};

export const insertProductScreenshot = async (
	productScreenshotData: CreateProductScreenshot
) => {
	return await db
		.insert(productScreenshots)
		.values(productScreenshotData)
		.returning();
};

export const deleteProductScreenshot = async (
	productId: number,
	screenshotId: number
) => {
	return await db
		.delete(productScreenshots)
		.where(
			and(
				eq(productScreenshots.productId, productId),
				eq(productScreenshots.id, screenshotId)
			)
		)
		.execute();
};
