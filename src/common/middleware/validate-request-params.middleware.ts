import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { z } from "zod";

type ValidationErrors = { [key: string]: string[] };

const formatValidationErrors = (errors: ValidationErrors): string => {
	return Object.entries(errors)
		.map(([field, messages]) => {
			const formattedMessages = messages.join(", ");
			return `${field}: [${formattedMessages}]`;
		})
		.join(", ");
};

const validateRequestParams =
	(targetSchema: z.Schema): RequestHandler =>
	({ params }, res, next) => {
		const validationResult = targetSchema.safeParse(params);

		if (!validationResult.success) {
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

			const formattedMessage = formatValidationErrors(errorMessage);

			throw new createHttpError.BadRequest(formattedMessage);
		}

		next();
	};

export { validateRequestParams };
