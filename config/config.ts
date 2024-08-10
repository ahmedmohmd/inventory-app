import { ENV } from "./env";

const defaults = {
	port: 5000,
	version: 1,
};

const config = {
	defaults: defaults,
	apiEndPoint: `http://localhost:${ENV.PORT || defaults.port}/api/v${defaults.version}`,
};

export { config };
