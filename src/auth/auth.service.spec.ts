// import createHttpError from "http-errors";
// import { describe, expect, it, vi } from "vitest";
// import { Role } from "../common/enums/user-role.enum";
// import { login, register } from "./auth.service";

// const fakeUser = {
// 	id: 1,
// 	name: "Ahmed",
// 	email: "ahmed@gmail.com",
// 	password: "$2b$10$SRVtrp567O2IYV21s2tc3elz5ME8ItgGhvTo4QjCj1/kpvtj48n4.",
// 	role: Role.ADMIN,
// };

// vi.mock("../logging", () => ({
// 	default: {
// 		general: {
// 			info: vi.fn(),
// 		},
// 		errors: {
// 			error: vi.fn(),
// 		},
// 	},
// }));

// vi.mock("../users/users.service.ts", () => ({
// 	findUserByEmail: vi.fn((email: string) => {
// 		const targetUser = fakeUsers.find((user) => user.email === email);

// 		return new Promise((resolve) => resolve(targetUser));
// 	}),
// 	insertUser: vi.fn(() => Promise.resolve(fakeUser)),
// }));

// vi.mock("./utils/jwt.util.ts", () => ({
// 	createJwtToken: vi.fn(() => Promise.resolve("fake-token")),
// }));

// const fakeUsers = [
// 	{
// 		id: 1,
// 		name: "Ahmed",
// 		email: "ahmed@gmail.com",
// 		password: "$2b$10$SRVtrp567O2IYV21s2tc3elz5ME8ItgGhvTo4QjCj1/kpvtj48n4.",
// 		role: Role.ADMIN,
// 	},
// 	{
// 		id: 2,
// 		name: "Khaled",
// 		email: "khaled@gmail.com",
// 		password: "$2b$10$SRVtrp567O2IYV21s2tc3elz5ME8ItgGhvTo4QjCj1/kpvtj48n4.",
// 		role: Role.ADMIN,
// 	},
// ];

// describe("login()", () => {
// 	it("Should return an error if user not found", async () => {
// 		const fakeEmail = "test@gmail.com";
// 		const fakePassword = "12345";

// 		try {
// 			await login(fakeEmail, fakePassword);
// 		} catch (error) {
// 			expect(error).toBeInstanceOf(createHttpError.NotFound);
// 		}
// 	});

// 	it("Should return an error if password is wrong", async () => {
// 		const fakeEmail = "ahmed@gmail.com";
// 		const fakePassword = "1234567";

// 		try {
// 			await login(fakeEmail, fakePassword);
// 		} catch (error) {
// 			expect(error).toBeInstanceOf(createHttpError.Unauthorized);
// 		}
// 	});

// 	it("Should return an token", async () => {
// 		const fakeEmail = "ahmed@gmail.com";
// 		const fakePassword = "12345";

// 		const actualResult = await login(fakeEmail, fakePassword);

// 		expect(actualResult).toEqual({ token: "fake-token" });
// 	});
// });

// describe("register", () => {
// 	it("should call createUser method", async () => {
// 		const fakeUserData = {
// 			name: "Ahmed Muhammad",
// 			email: "ahmed@gmail.com",
// 			password: "12345",
// 			role: Role.ADMIN,
// 		};
// 		const expectedResult = { token: "fake-token" };

// 		const actualResult = await register(fakeUserData);

// 		expect(actualResult).toEqual(expectedResult);
// 	});
// });
