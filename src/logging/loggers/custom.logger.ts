import { Format } from "logform";
import { createLogger, format as f } from "winston";
import { LogLevel } from "../enums/log-level.enum";
import { consoleTransport } from "../transports/console.transport";
import { createFileTransport } from "../transports/file.transport";
import DailyRotateFile from "winston-daily-rotate-file";
import { ConsoleTransportInstance } from "winston/lib/winston/transports";

const createCustomLogger = (
	name: string,
	level: LogLevel | null = null,
	format: Format = f.json()
) => {
	const loggerTransports: (ConsoleTransportInstance | DailyRotateFile)[] = [
		createFileTransport(name, level, format),
	];

	if (process.env.NODE_ENV === "development") {
		loggerTransports.push(consoleTransport);
	}

	return createLogger({
		level: level || undefined,
		transports: loggerTransports,
	});
};

export { createCustomLogger };
