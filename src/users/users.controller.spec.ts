import { NextFunction, Request, Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";
import usersController from "./users.controller";
import usersService from "./users.service";

vi.mock("./users.service", () => ({
	findAllUsers: vi.fn(() => Promise.resolve([])),
	findUserById: vi.fn(() => Promise.resolve({})),
	updateUser: vi.fn(() => Promise.resolve({})),
	deleteUser: vi.fn(() => Promise.resolve({})),
}));

let fakeRequest = {} as Request;
let fakeResponse = {} as Response;
let fakeNextFunction = vi.fn() as NextFunction;

beforeEach(() => {
	fakeRequest = {} as Request;
	fakeResponse = {} as Response;
	fakeNextFunction = vi.fn() as NextFunction;
});

describe("getAllUsers()", () => {
	it("Should call findAllUsers() and json() methods", async () => {
		fakeResponse.json = vi.fn();
		fakeResponse.status = vi.fn(() => fakeResponse);

		await usersController.getAllUsers(
			fakeRequest,
			fakeResponse,
			fakeNextFunction
		);

		expect(usersService.findAllUsers).toHaveBeenCalledOnce();
		expect(fakeResponse.json).toHaveBeenCalledOnce();
	});
});

describe("getSingleUser()", () => {
	it("Should call findUserById() and json() methods", async () => {
		fakeResponse.json = vi.fn();
		fakeResponse.status = vi.fn(() => fakeResponse);
		fakeRequest.params = {
			id: "1",
		};

		await usersController.getSingleUser(
			fakeRequest,
			fakeResponse,
			fakeNextFunction
		);

		expect(usersService.findAllUsers).toHaveBeenCalledOnce();
		expect(fakeResponse.json).toHaveBeenCalledOnce();
	});
});

describe("updateUser()", () => {
	it("Should call updateUser() and json() methods", async () => {
		const userData = {
			name: "Ahmed",
		};

		fakeRequest.params = {
			id: "1",
		};
		fakeRequest.body = userData;
		fakeResponse.json = vi.fn();
		fakeResponse.status = vi.fn(() => fakeResponse);

		await usersController.updateUser(
			fakeRequest,
			fakeResponse,
			fakeNextFunction
		);

		expect(usersService.updateUser).toHaveBeenCalledOnce();
		expect(fakeResponse.json).toHaveBeenCalledOnce();
	});
});

describe("deleteUser()", () => {
	it("Should call deleteUser() and json() methods", async () => {
		fakeResponse.status = vi.fn(() => fakeResponse);
		fakeResponse.json = vi.fn();
		fakeRequest.params = {
			id: "1",
		};

		await usersController.deleteUser(
			fakeRequest,
			fakeResponse,
			fakeNextFunction
		);

		expect(usersService.deleteUser).toHaveBeenCalledOnce();
		expect(fakeResponse.json).toHaveBeenCalledOnce();
	});
});
