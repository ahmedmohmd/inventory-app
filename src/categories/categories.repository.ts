import { eq } from "drizzle-orm";
import { db } from "../db";
import { categories } from "../db/schema/category.schema";
import { CreateCategory, UpdateCategory } from "./categories.types";

const findCategoryById = async (id: number) => {
	return await db.query.categories.findFirst({
		where: eq(categories.id, id),
	});
};

const findCategoryByName = async (name: string) => {
	return await db.query.categories.findFirst({
		where: eq(categories.name, name),
	});
};

const findAllCategories = async () => {
	return await db.select().from(categories);
};

const insertCategory = async (categoryData: CreateCategory) => {
	const createdCategory = await db
		.insert(categories)
		.values(categoryData)
		.returning({
			id: categories.id,
			name: categories.name,
			description: categories.description,
			createdAt: categories.createdAt,
			updatedAt: categories.updatedAt,
		});

	return createdCategory[0];
};

const updateCategory = async (id: number, categoryData: UpdateCategory) => {
	for (const field of Object.keys(categoryData)) {
		// eslint-disable-next-line
		await db
			.update(categories)
			.set({ [field]: categoryData[field as keyof UpdateCategory] });
	}

	return;
};

const deleteCategory = async (id: number) => {
	return await db.delete(categories).where(eq(categories.id, id)).execute();
};

export {
	deleteCategory,
	findAllCategories,
	findCategoryById,
	findCategoryByName,
	insertCategory,
	updateCategory,
};
