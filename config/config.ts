import { ENV } from "./env";

const defaults = {
	port: 3000,
	version: 1,
};

const pagination = {
	limit: 12,
	page: 1,
};

const SECONDS = 60;
const MINUTES = 60;
const HOURES = 1;

const CACHE_DURATION = SECONDS * MINUTES * HOURES;

const caching = {
	duration: CACHE_DURATION,
};

const config = {
	defaults: defaults,
	apiEndPoint: `http://localhost:${ENV.PORT || defaults.port}/api/v${defaults.version}`,
	pagination: pagination,
	caching: caching,
};

export { config };
