import { LogLevel } from "../enums/log-level.enum";
import { createCustomLogger } from "./custom.logger";

const errorsLogger = createCustomLogger("error", LogLevel.ERROR);

export { errorsLogger };
