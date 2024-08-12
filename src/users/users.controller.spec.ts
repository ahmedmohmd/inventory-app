import { NextFunction, Request, Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	deleteUser,
	getAllUsers,
	getSingleUser,
	updateUser,
} from "./users.controller";
import * as usersService from "./users.service";

vi.mock("./users.service", () => ({
	findAllUsers: vi.fn(() => Promise.resolve([])),
	findUserById: vi.fn(() => Promise.resolve({})),
	updateUser: vi.fn(() => Promise.resolve({})),
	deleteUser: vi.fn(() => Promise.resolve({})),
}));

// vi.mock("re")

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

		await getAllUsers(fakeRequest, fakeResponse, fakeNextFunction);

		expect(usersService.findAllUsers).toHaveBeenCalledOnce();
		expect(fakeResponse.json).toHaveBeenCalledOnce();
	});
});

describe("getSingleUser()", () => {
	it("Should call findUserById() and json() methods", async () => {
		fakeResponse.json = vi.fn();
		fakeRequest.params = {
			id: "1",
		};

		await getSingleUser(fakeRequest, fakeResponse, fakeNextFunction);

		expect(usersService.findAllUsers).toHaveBeenCalledOnce();
		expect(fakeResponse.json).toHaveBeenCalledOnce();
	});
});

describe("updateUser()", () => {
	it("Should call updateUser() and json() methods", async () => {
		const userData = {
			name: "Ahmed",
		};

		fakeResponse.json = vi.fn();
		fakeRequest.params = {
			id: "1",
		};
		fakeRequest.body = userData;

		await updateUser(fakeRequest, fakeResponse, fakeNextFunction);

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

		await deleteUser(fakeRequest, fakeResponse, fakeNextFunction);

		expect(usersService.deleteUser).toHaveBeenCalledOnce();
		expect(fakeResponse.json).toHaveBeenCalledOnce();
	});
});
