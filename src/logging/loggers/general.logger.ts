import { LogLevel } from "../enums/log-level.enum";
import { createCustomLogger } from "./custom.logger";

const generalLogger = createCustomLogger("general", LogLevel.INFO);

export { generalLogger };
