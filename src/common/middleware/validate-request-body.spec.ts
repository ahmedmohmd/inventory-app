import { NextFunction, Request, Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { validateRequestBody } from "./validate-request-body.middleware";

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
			email: z.string(),
		});
	});

	it("Should throw an Error if is not Valid.", () => {
		const validationResult = validateRequestBody(fakeSchema);
		const middlewareResult = () =>
			validationResult(fakeRequest, fakeResponse, fakeNextFunction);

		expect(middlewareResult).toThrow();
	});

	it("Should Call next if Request Body is Valid.", () => {
		fakeRequest = { body: { email: "ahmed@gmail.com" } } as Request;

		const validationResult = validateRequestBody(fakeSchema);
		validationResult(fakeRequest, fakeResponse, fakeNextFunction);

		expect(fakeNextFunction).toHaveBeenCalledOnce();
	});
});
