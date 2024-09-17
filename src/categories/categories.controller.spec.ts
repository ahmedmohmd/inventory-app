import { NextFunction, Request, Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HttpStatusCode } from "../common/enums/http-status-code.enum";
import categoriesController from "./categories.controller";
import categoriesService from "./categories.service";

vi.mock("./categories.service.ts", () => ({
	findCategoryById: vi.fn(() => Promise.resolve({})),
	findAllCategories: vi.fn(() => Promise.resolve([])),
	insertCategory: vi.fn(() => Promise.resolve({})),
	updateCategory: vi.fn(() => Promise.resolve(undefined)),
	deleteCategory: vi.fn(() => Promise.resolve(undefined)),
}));

let fakeRequest: Request;
let fakeResponse: Response;
let fakeNextFunction: NextFunction;

beforeEach(() => {
	fakeRequest = {} as Request;
	fakeResponse = {} as Response;
	fakeNextFunction = vi.fn();

	fakeResponse.json = vi.fn();
	fakeResponse.status = vi.fn(() => fakeResponse);
});

describe("getSingleCategory()", () => {
	it("should getSingleCategory() function", async () => {
		const id = "1";
		fakeRequest.params = {
			id,
		};

		const findCategoryByIdSpy = vi.spyOn(categoriesService, "findCategoryById");

		await categoriesController.getSingleCategory(
			fakeRequest,
			fakeResponse,
			fakeNextFunction
		);

		expect(findCategoryByIdSpy).toHaveBeenCalledWith(Number(id));
		expect(fakeResponse.status).toHaveBeenCalledWith(HttpStatusCode.OK);
		expect(fakeResponse.json).toHaveBeenCalledOnce();
	});
});

describe("getAllCategories()", () => {
	it("should success return response", async () => {
		const findAllCategoriesSpy = vi.spyOn(
			categoriesService,
			"findAllCategories"
		);

		await categoriesController.getAllCategories(
			fakeRequest,
			fakeResponse,
			fakeNextFunction
		);

		expect(findAllCategoriesSpy).toHaveBeenCalledOnce();
		expect(fakeResponse.status).toHaveBeenCalledWith(HttpStatusCode.OK);
		expect(fakeResponse.json).toHaveBeenCalledOnce();
	});
});

describe("createCategory()", () => {
	it("should success create category", async () => {
		const insertCategorySpy = vi.spyOn(categoriesService, "insertCategory");

		fakeRequest.body = {
			name: "category",
			description: "category description",
		};

		await categoriesController.createCategory(
			fakeRequest,
			fakeResponse,
			fakeNextFunction
		);

		expect(insertCategorySpy).toHaveBeenCalledWith(fakeRequest.body);
		expect(fakeResponse.status).toHaveBeenCalledWith(HttpStatusCode.CREATED);
		expect(fakeResponse.json).toHaveBeenCalledOnce();
	});
});

describe("updateCategory()", () => {
	it("should success create category", async () => {
		const updateCategorySpy = vi.spyOn(categoriesService, "updateCategory");

		const id = "1";
		fakeRequest.params = {
			id,
		};
		fakeRequest.body = {
			description: "category description",
		};

		await categoriesController.updateCategory(
			fakeRequest,
			fakeResponse,
			fakeNextFunction
		);

		expect(updateCategorySpy).toHaveBeenCalledWith(
			Number(id),
			fakeRequest.body
		);
		expect(fakeResponse.status).toHaveBeenCalledWith(HttpStatusCode.CREATED);
		expect(fakeResponse.json).toHaveBeenCalledOnce();
	});
});

describe("deleteCategory()", () => {
	it("should success create category", async () => {
		const deleteCategorySpy = vi.spyOn(categoriesService, "deleteCategory");

		const id = "1";
		fakeRequest.params = {
			id,
		};

		await categoriesController.deleteCategory(
			fakeRequest,
			fakeResponse,
			fakeNextFunction
		);

		expect(deleteCategorySpy).toHaveBeenCalledWith(Number(id));
		expect(fakeResponse.status).toHaveBeenCalledWith(HttpStatusCode.NO_CONTENT);
		expect(fakeResponse.json).toHaveBeenCalledOnce();
	});
});
