import { ENV } from "./env";

const defaults = {
	port: 3000,
	version: 1,
};

const pagination = {
	limit: 12,
	page: 1,
};

const config = {
	defaults: defaults,
	apiEndPoint: `http://localhost:${ENV.PORT || defaults.port}/api/v${defaults.version}`,
	pagination: pagination,
};

export { config };
