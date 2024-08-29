import crypto from "crypto";
import { describe, expect, it, vi } from "vitest";
import { generateRandomToken } from "./random-token.util";

vi.mock("crypto", () => ({
	default: {
		randomBytes: vi.fn(() => "1234567890"),
		hex: vi.fn(() => "1234567890"),
	},
}));

describe("randomToken()", () => {
	it("Should call randomBytes method.", () => {
		const randomBytesMethodSpy = vi.spyOn(crypto, "randomBytes");
		const tokenLength = 10;

		generateRandomToken(tokenLength);

		expect(randomBytesMethodSpy).toHaveBeenCalledOnce();
	});

	it("Should return a random token.", () => {
		const tokenLength = 10;

		const actualToken = generateRandomToken(tokenLength);

		expect(actualToken).toBe("1234567890");
	});
});
