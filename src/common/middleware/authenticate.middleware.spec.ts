import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as usersService from "../../users/users.service";
import { authenticate } from "./authenticate.middleware";

vi.mock("../../logging", () => ({
	default: {
		errors: {
			error: vi.fn(),
		},

		general: {
			info: vi.fn(),
		},
	},
}));

vi.mock("../../auth/utils/jwt.util.ts", () => ({
	decodeJwtToken: vi.fn(() => Promise.resolve({ id: 0, role: "admin" })),
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

		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("Should call error method in logger an error.", async () => {
		try {
			await authenticate(fakeRequest, fakeResponse, fakeNextFunction);
		} catch (error) {
			expect(error).toBeInstanceOf(createHttpError.Unauthorized);
		}
	});

	it("Should call next function without any errors.", async () => {
		// eslint-disable-next-line
		vi.spyOn(usersService, "findUserById").mockResolvedValue({} as any);

		fakeRequest.headers.authorization = "fake-jwt-token";

		await authenticate(fakeRequest, fakeResponse, fakeNextFunction);

		expect(fakeNextFunction).toBeCalled();
	});

	it("Should throw not found error if user not found.", async () => {
		try {
			vi.spyOn(usersService, "findUserById").mockResolvedValue(
				// eslint-disable-next-line
				undefined as any
			);

			fakeRequest.headers.authorization = "fake-jwt-token";
			await authenticate(fakeRequest, fakeResponse, fakeNextFunction);
		} catch (error) {
			expect(error).toBeInstanceOf(createHttpError.NotFound);
		}
	});
});
