import { createLogger } from "winston";
import { LogLevel } from "../enums/log-level.enum";
import { consoleTransport } from "../transports/console.transport";
import { createFileTransport } from "../transports/file.transport";

const createCustomLogger = (name: string, level: LogLevel | null = null) =>
	createLogger({
		level: level || undefined,
		transports: [consoleTransport, createFileTransport(name, level)],
	});

export { createCustomLogger };
