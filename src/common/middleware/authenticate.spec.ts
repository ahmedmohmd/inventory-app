import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { authenticate } from "./authenticate.middleware";

vi.mock("../../logging", () => ({
	default: {
		errors: {
			error: vi.fn(),
		},
	},
}));

describe("authenticate()", () => {
	let fakeRequest: Request;
	let fakeResponse: Response;
	let fakeNextFunction: NextFunction;

	beforeEach(() => {
		fakeRequest = {
			headers: {},
		} as Request;
		fakeResponse = {} as Response;
		fakeNextFunction = vi.fn();
	});

	it("Should call error method in logger an error.", async () => {
		try {
			await authenticate(fakeRequest, fakeResponse, fakeNextFunction);
		} catch (error) {
			expect(error).toBeInstanceOf(createHttpError.Unauthorized);
		}
	});

	it("Should call next function without any errors.", async () => {
		fakeRequest.headers.authorization = "fake-jwt-token";

		await authenticate(fakeRequest, fakeResponse, fakeNextFunction);

		expect(fakeNextFunction).toBeCalled();
	});
});
