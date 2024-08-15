import createHttpError from "http-errors";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	deleteCategory,
	findAllCategories,
	findCategoryById,
	insertCategory,
	updateCategory,
} from "./categories.service";
import { UpdateCategory } from "./categories.types";

// eslint-disable-next-line
let fakeCategories: any[];

vi.mock("./categories.repository.ts", () => ({
	findCategoryById: vi.fn((id: number) => {
		return Promise.resolve(fakeCategories.find((cat) => cat.id === id));
	}),
	findAllCategories: vi.fn(() => Promise.resolve(fakeCategories)),
	insertCategory: vi.fn((categoryData) => {
		fakeCategories.push({ id: 3, ...categoryData });

		return Promise.resolve(categoryData);
	}),
	updateCategory: vi.fn((id: number, categoryData: UpdateCategory) => {
		const targetCategory = fakeCategories.find((cat) => cat.id === id);

		if (!targetCategory) {
			return Promise.resolve(undefined);
		}

		Object.assign(targetCategory, { ...categoryData });

		return Promise.resolve(undefined);
	}),
	deleteCategory: vi.fn((id: number) => {
		fakeCategories = fakeCategories.filter((cat) => cat.id === id);

		return Promise.resolve(undefined);
	}),
	findCategoryByName: vi.fn((name: string) => {
		return Promise.resolve(fakeCategories.find((cat) => cat.name === name));
	}),
}));

beforeEach(() => {
	fakeCategories = [
		{
			id: 1,
			name: "Category 1",
			description: "Category 1 description.",
		},
		{
			id: 2,
			name: "Category 2",
			description: "Category 2 description.",
		},
	];
});

describe("findCategoryById()", () => {
	it("Should throw an error if category is not found", async () => {
		try {
			const id = 3;

			await findCategoryById(id);
		} catch (error) {
			expect(error).toBeInstanceOf(createHttpError.NotFound);
		}
	});

	it("Should return target category", async () => {
		const id = 1;

		const targetCategory = await findCategoryById(id);

		expect(targetCategory).toEqual(fakeCategories[0]);
	});
});

describe("findAllCategories()", () => {
	it("Should return all categories", async () => {
		const allCategories = await findAllCategories();

		expect(allCategories).toEqual(fakeCategories);
	});
});

describe("insertCategory()", () => {
	it("Should throw an error if category already exists", async () => {
		const category = {
			id: 1,
			name: "Category 1",
			description: "Category 1 description.",
		};

		try {
			await insertCategory(category);
		} catch (error) {
			expect(error).toBeInstanceOf(createHttpError.BadRequest);
		}
	});

	it("Should return created category", async () => {
		const category = {
			id: 3,
			name: "Category 3",
			description: "Category 3 description.",
		};

		const createdCategory = await insertCategory(category);

		expect(createdCategory).toEqual(category);
	});
});

describe("updateCategory", () => {
	it("Should throw an error if category does not exists", async () => {
		const id = 3;
		const category = {
			description: "Category 1 description.",
		};

		try {
			await updateCategory(id, category);
		} catch (error) {
			expect(error).toBeInstanceOf(createHttpError.NotFound);
		}
	});

	it("Should return undefined category", async () => {
		const id = 2;
		const category = {
			description: "Category 1 description.",
		};

		const createdCategory = await updateCategory(id, category);

		expect(createdCategory).toBeUndefined();
	});
});

describe("deleteCategory()", () => {
	it("Should throw an error if category does not exists", async () => {
		const id = 3;

		try {
			await deleteCategory(id);
		} catch (error) {
			expect(error).toBeInstanceOf(createHttpError.NotFound);
		}
	});

	it("Should return undefined category", async () => {
		const id = 1;

		const deletedCategory = await deleteCategory(id);

		expect(deletedCategory).toBeUndefined();
	});
});
