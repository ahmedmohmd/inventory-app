import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Role } from "../enums/user-role.enum";
import { authUserRoles } from "./auth-user-roles.middleware";

vi.mock("../../logging", () => ({
	default: {
		errors: {
			error: vi.fn(),
		},
	},
}));

describe("authUserRoles()", () => {
	let fakeRequest: Request = {} as Request;
	const fakeResponse: Response = {} as Response;
	const fakeNextFunction: NextFunction = vi.fn();

	beforeEach(() => {
		Object.assign(fakeRequest, { user: { id: 1 } });
	});

	it("Should Throw if User not found", async () => {
		try {
			fakeRequest = {} as Request;

			await authUserRoles(Role.ADMIN)(
				fakeRequest,
				fakeResponse,
				fakeNextFunction
			);
		} catch (error) {
			expect(error).toBeInstanceOf(createHttpError.Unauthorized);
		}
	});

	it("Should Throw if User not authorized", async () => {
		try {
			await authUserRoles(Role.ADMIN)(
				fakeRequest,
				fakeResponse,
				fakeNextFunction
			);
		} catch (error) {
			expect(error).toBeInstanceOf(createHttpError.Forbidden);
		}
	});

	it("Should call next function if all is well", async () => {
		Object.assign(fakeRequest, {
			user: {
				id: 1,
				role: "admin",
			},
		});

		await authUserRoles(Role.ADMIN)(
			fakeRequest,
			fakeResponse,
			fakeNextFunction
		);

		expect(fakeNextFunction).toHaveBeenCalledOnce();
	});
});
