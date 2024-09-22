import { config } from "../../../config/config";
import cache from "../../cache";

/**
 * Retrieves data from cache or database based on the provided key.
 *
 * @param {string} key - The cache key to use for retrieving data.
 * @param {function} fetchFromDb - A function that fetches data from the database.
 * @return {object} The retrieved data.
 */
const handleCache = async (
	key: string,
	fetchFromDb: () => Promise<object | null | undefined>,
	duration: number = config.caching.duration
) => {
	const targetFromCache = await cache.service.getFromCache(key);

	if (targetFromCache) {
		return JSON.parse(targetFromCache);
	}

	const element = await fetchFromDb();

	if (element !== null && element !== undefined) {
		await cache.service.addToCacheWithTTL(
			key,
			JSON.stringify(element),
			duration
		);
	}

	return element;
};

export default handleCache;
