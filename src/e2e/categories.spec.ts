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

describe("Get all categories route", () => {
	it("should get 401 status code", async () => {
		const response = await request(app).get("/api/v1/categories");
		expect(response.statusCode).toBe(HttpStatusCode.OK);
	});
});
