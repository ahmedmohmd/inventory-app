import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { z } from "zod";

type ValidationErrors = { [key: string]: string[] };

const validateRequestBody =
	(targetSchema: z.Schema): RequestHandler =>
	({ body }, res, next) => {
		const validationResult = targetSchema.safeParse(body);

		if (validationResult.success === false) {
			const errorMessage =
				validationResult.error.errors.reduce<ValidationErrors>(
					(acc: ValidationErrors, err: z.ZodIssue) => {
						const path = err.path.join(".");

						if (!acc[path]) {
							acc[path] = [];
						}

						acc[path].push(err.message);

						return acc;
					},
					{}
				);

			throw new createHttpError.BadRequest(JSON.stringify(errorMessage));
		}

		next();
	};

export { validateRequestBody };
