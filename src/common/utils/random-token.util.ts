import crypto from "crypto";

const HAVE_LENGTH = 2;

const generateRandomToken = (tokenLength: number) => {
	return crypto
		.randomBytes(Math.ceil(tokenLength / HAVE_LENGTH))
		.toString("hex")
		.slice(0, tokenLength);
};

export { generateRandomToken };
