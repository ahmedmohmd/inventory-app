import { accessLogger } from "./loggers/access.logger";
import { errorsLogger } from "./loggers/error.logger";
import { infoLogger } from "./loggers/info.logger";

export default { info: infoLogger, error: errorsLogger, access: accessLogger };
