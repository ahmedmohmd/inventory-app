import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../..";
import { HttpStatusCode } from "../common/enums/http-status-code.tnum";

describe("Get all users route", () => {
	it("should get 401 status code", async () => {
		const response = await request(app).get("/api/v1/users");
		expect(response.statusCode).toBe(HttpStatusCode.UNAUTHORIZED);
	});
});

describe("Get single user route", () => {
	it("should get a single user", async () => {
		const response = await request(app).get("/api/v1/users/1");

		expect(response.statusCode).toBe(HttpStatusCode.UNAUTHORIZED);
	});
});

describe("Update user route", () => {
	it("should get a single user", async () => {
		const response = await request(app).patch("/api/v1/users/1");

		expect(response.statusCode).toBe(HttpStatusCode.UNAUTHORIZED);
	});
});

describe("Delete user route", () => {
	it("should get a single user", async () => {
		const response = await request(app).delete("/api/v1/users/1");

		expect(response.statusCode).toBe(HttpStatusCode.UNAUTHORIZED);
	});
});
