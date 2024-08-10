import jwt from "jsonwebtoken";
import { describe, expect, it, vi } from "vitest";
import { createJwtToken, decodeJwtToken } from "./jwt.util";

describe("createJwtToken()", () => {
	it("Should call sign method.", () => {
		const fakePayload = { name: "Ahmed" };
		const signMethodSpy = vi.spyOn(jwt, "sign");

		createJwtToken(fakePayload);

		expect(signMethodSpy).toHaveBeenCalledOnce();
	});
});

describe("decodeJwtToken()", () => {
	it("Should call decode method.", () => {
		const fakeJwtToken = "abcdefgh";
		const decodeMethodSpy = vi.spyOn(jwt, "decode");

		decodeJwtToken(fakeJwtToken);

		expect(decodeMethodSpy).toHaveBeenCalledOnce();
	});
});
