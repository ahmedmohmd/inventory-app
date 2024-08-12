import { NextFunction, Request, Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { validateRequestQuery } from "./validate-request-query.middleware";

describe("validateRequestBody()", () => {
	let fakeRequest = {} as Request;
	let fakeResponse = {} as Response;
	let fakeNextFunction = vi.fn() as NextFunction;
	let fakeSchema = {} as z.Schema;

	beforeEach(() => {
		fakeRequest = {} as Request;
		fakeResponse = {} as Response;
		fakeNextFunction = vi.fn() as NextFunction;
		fakeSchema = z.object({
			search: z.string(),
		});
	});

	it("Should throw an Error if is not Valid.", () => {
		const validationResult = validateRequestQuery(fakeSchema);
		const middlewareResult = () =>
			validationResult(fakeRequest, fakeResponse, fakeNextFunction);

		expect(middlewareResult).toThrow();
	});

	it("Should Call next if Request params is Valid.", () => {
		(fakeRequest as Request).query = { search: "asd" };

		const validationResult = validateRequestQuery(fakeSchema);
		validationResult(fakeRequest, fakeResponse, fakeNextFunction);

		expect(fakeNextFunction).toHaveBeenCalledOnce();
	});
});
