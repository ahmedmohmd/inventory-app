import type { ErrorRequestHandler } from "express";
import createHttpError from "http-errors";
import { HttpStatusCode } from "../common/enums/http-status-code.enum";
import logger from "../logging";

// eslint-disable-next-line
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
	logger.error.error(err.stack);

	if (createHttpError.isHttpError(err)) {
		return res.status(err.statusCode).json({
			errors: err.message,
			success: false,
			status: err.statusCode,
		});
	}

	return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
		message: "Oops! Something went wrong. We're on it!",
		success: false,
		status: HttpStatusCode.INTERNAL_SERVER_ERROR,
	});
};

export default globalErrorHandler;
