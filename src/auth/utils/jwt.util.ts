import jwt from "jsonwebtoken";
import { ENV } from "../../../config/env";

/**
 * Creates a JSON Web Token (JWT) from the provided payload.
 *
 * @param {object} payload - The payload to be signed and encoded in the JWT.
 * @return {string} The created JWT token.
 */
const createJwtToken = async (payload: object) => {
	const createdJwtToken = await jwt.sign(payload, ENV.JWT_SECRET);

	return createdJwtToken;
};

/**
 * Decodes a JSON Web Token (JWT) and returns its payload.
 *
 * @param {string} jwtToken - The JWT token to be decoded.
 * @return {object} The decoded payload of the JWT token.
 */
const decodeJwtToken = async (jwtToken: string) => {
	const payload = jwt.decode(jwtToken);

	return payload;
};

export { createJwtToken, decodeJwtToken };
