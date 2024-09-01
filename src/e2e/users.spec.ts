import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import { app } from "../../app";
import { HttpStatusCode } from "../common/enums/http-status-code.enum";

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

describe.skip("Get all users route", () => {
	it("should get 401 status code", async () => {
		const response = await request(app).get("/api/v1/users");
		expect(response.statusCode).toBe(HttpStatusCode.UNAUTHORIZED);
	});
});

describe.skip("Get single user route", () => {
	it("should get a single user", async () => {
		const response = await request(app).get("/api/v1/users/1");

		expect(response.statusCode).toBe(HttpStatusCode.UNAUTHORIZED);
	});
});

describe.skip("Update user route", () => {
	it("should get a single user", async () => {
		const response = await request(app).patch("/api/v1/users/1");

		expect(response.statusCode).toBe(HttpStatusCode.UNAUTHORIZED);
	});
});

describe.skip("Delete user route", () => {
	it("should get a single user", async () => {
		const response = await request(app).delete("/api/v1/users/1");

		expect(response.statusCode).toBe(HttpStatusCode.UNAUTHORIZED);
	});
});
