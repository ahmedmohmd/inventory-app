import { format } from "winston";
import { LogLevel } from "../enums/log-level.enum";
import { createCustomLogger } from "./custom.logger";

const { combine, timestamp, printf, json } = format;

const IDENTATION_LEVEL = 2;

const customInfoFormat = printf(
	({ level, message, timestamp, ...metadata }) => {
		let msg = `${timestamp} [${level.toUpperCase()}] ${message}`;
		if (Object.keys(metadata).length > 0) {
			msg += `\n\tMetadata: ${JSON.stringify(metadata, null, IDENTATION_LEVEL)}`;
		}
		return msg;
	}
);

const infoLogFormat = combine(
	timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
	customInfoFormat,
	json()
);

const infoLogger = createCustomLogger("info", LogLevel.INFO, infoLogFormat);

export { infoLogger };
