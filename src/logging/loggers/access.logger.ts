import { format } from "winston";
import { LogLevel } from "../enums/log-level.enum";
import { createCustomLogger } from "./custom.logger";

const { combine, timestamp, json } = format;

const logFormat = combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), json());

const accessLogger = createCustomLogger("access", LogLevel.INFO, logFormat);

export { accessLogger };
