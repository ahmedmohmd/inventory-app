import bcrypt from "bcrypt";
import { describe, expect, it, vi } from "vitest";
import { checkPassword, hashPassword } from "./password-hash.util";

describe("hashPassword", () => {
	it("should return nothing if password is empty", () => {
		const fakePassword = "";
		const expectedResult = "";
		const actualResult = hashPassword(fakePassword);

		expect(actualResult).toBe(expectedResult);
	});

	it("Should call hash method.", () => {
		const fakePassword = "fake-password";
		const hashMethodSpy = vi.spyOn(bcrypt, "hash");

		hashPassword(fakePassword);

		expect(hashMethodSpy).toHaveBeenCalledOnce();
	});
});

describe("checkPassword()", () => {
	it("Should return false if any param is empty.", async () => {
		const fakePassword = "";
		const hashedFakePassword = "";
		const expectedResult = false;
		const actualResult = await checkPassword(fakePassword, hashedFakePassword);

		expect(actualResult).toBe(expectedResult);
	});

	it("Should call compare() method if params are correct.", () => {
		const fakePassword = "111";
		const hashedFakePassword = "sdfsdfsdfsdf";
		const compareSyncMethodSpy = vi.spyOn(bcrypt, "compare");

		checkPassword(fakePassword, hashedFakePassword);

		expect(compareSyncMethodSpy).toHaveBeenCalledOnce();
	});
});
