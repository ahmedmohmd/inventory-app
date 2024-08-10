import jwt from "jsonwebtoken";
import { ENV } from "../../../config/env";

const createJwtToken = async (payload: object) => {
	const createdJwtToken = await jwt.sign(payload, ENV.JWT_SECRET);

	return createdJwtToken;
};

const decodeJwtToken = async (jwtToken: string) => {
	const payload = jwt.decode(jwtToken);

	return payload;
};

export { createJwtToken, decodeJwtToken };
