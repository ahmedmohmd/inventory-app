import { format } from "winston";
import { LogLevel } from "../enums/log-level.enum";
import { createCustomLogger } from "./custom.logger";

const { combine, timestamp, printf, errors, json } = format;

const customFormat = printf(({ level, message, timestamp, ...metadata }) => {
	let msg = `${timestamp} [${level}]: ${message}`;
	if (Object.keys(metadata).length > 0) {
		msg += ` | ${JSON.stringify(metadata)}`;
	}
	return msg;
});

const logFormat = combine(
	errors({ stack: true }),
	timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
	customFormat,
	json()
);

const errorsLogger = createCustomLogger("error", LogLevel.ERROR, logFormat);

export { errorsLogger };
