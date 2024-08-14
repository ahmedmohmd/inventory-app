import createHttpError from "http-errors";
import { beforeEach, describe, expect, it, vi } from "vitest";
import usersRepository from "./users.repository";
import {
	findAllUsers,
	findUserById,
	insertUser,
	updateUser,
} from "./users.service";
import { CreateUser } from "./users.types";

interface FakeUser {
	id: number;
	name: string;
	email: string;
	password: string;
	role: string;
}

let fakeUser: Partial<FakeUser> = {};

let fakeUsers: FakeUser[] = [
	{
		id: 1,
		name: "Ahmed",
		email: "ahmed@gmail.com",
		password: "12345",
		role: "admin",
	},
	{
		id: 2,
		name: "Khaled",
		email: "khaled@gmail.com",
		password: "12345",
		role: "admin",
	},
];

vi.mock("../logging", () => ({
	default: {
		general: {
			info: vi.fn(),
		},
		errors: {
			error: vi.fn(),
		},
	},
}));

vi.mock("./users.repository.ts", () => ({
	default: {
		findAllUsers: vi.fn(() => new Promise((resolve) => resolve([]))),
		findUserById: vi.fn(
			(id: number) =>
				new Promise((resolve) => {
					const targetUser = fakeUsers.find((user) => user.id === id);

					resolve(targetUser);
				})
		),
		findUserByEmail: vi.fn(
			(email: string) =>
				new Promise((resolve) =>
					resolve(fakeUsers.find((user) => user.email === email))
				)
		),
		insertUser: vi.fn(
			(userData: FakeUser) =>
				new Promise((resolve) => {
					fakeUsers.push(userData);
					resolve(userData);
				})
		),
		deleteUser: vi.fn(
			(id: number) =>
				new Promise((resolve) => {
					fakeUsers = fakeUsers.filter((user) => user.id !== id);
					resolve(true);
				})
		),
		updateUser: vi.fn(
			(id: number, userData: Partial<FakeUser>) =>
				new Promise((resolve) => {
					// eslint-disable-next-line
					const targetUser: any = fakeUsers.find((user) => user.id !== id);

					targetUser.name = userData.name;
					targetUser.email = userData.email;
					targetUser.password = userData.password;

					resolve(true);
				})
		),
	},
}));

beforeEach(() => {
	fakeUser = {
		id: 1,
		name: "Ahmed",
		email: "ahmed@gmail.com",
		password: "12345",
		role: "admin",
	};

	vi.clearAllMocks();
});

describe("findUsers", () => {
	it("Should return empty array", async () => {
		const actualResult = await findAllUsers();

		expect(actualResult).toEqual([]);
	});
});

describe("findUserById()", () => {
	it("Should throw Error if User not Found.", async () => {
		const findUserByIdSpy = vi
			.spyOn(usersRepository, "findUserById")
			.mockResolvedValue(undefined);

		const id = 1;
		try {
			await findUserById(id);
		} catch (error) {
			expect(findUserByIdSpy).toBeCalledWith(id);
			expect(error).toBeInstanceOf(createHttpError.NotFound);
		}

		findUserByIdSpy.mockRestore();
	});

	it("Should return target User.", async () => {
		const id = 1;

		const targetUser = await findUserById(id);

		expect(usersRepository.findUserById).toBeCalledWith(id);
		expect(targetUser).toEqual(fakeUser);
	});
});

describe("insertUser()", () => {
	it("Should throw Error if User is exists.", async () => {
		try {
			await insertUser(fakeUser as CreateUser);
		} catch (error) {
			expect(error).toBeInstanceOf(createHttpError.BadRequest);
		}
	});

	it("Should return created user.", async () => {
		fakeUser.email = "gamal@gmail.com";

		const createdUser = await insertUser(fakeUser as CreateUser);

		expect(createdUser).toEqual(fakeUser);
	});
});

describe("updateUser()", () => {
	it("Should throw Error if User not Found.", async () => {
		const fakeData = {
			name: "Ahmed",
		};
		const id = 2;

		try {
			await updateUser(id, fakeData);
		} catch (error) {
			expect(error).toBeInstanceOf(createHttpError.NotFound);
		}
	});

	it("Should return true.", async () => {
		const fakeData = {
			name: "Ahmed",
		};
		const id = 2;

		const actualResult = await updateUser(id, fakeData);

		expect(actualResult).toEqual(true);
	});
});
