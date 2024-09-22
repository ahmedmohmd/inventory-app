import Redis from "ioredis";
import { ENV } from "../../config/env";

const redis = new Redis(ENV.REDIS_URL);

/**
 * Adds a value to the cache with the given key.
 *
 * @param {string} key - The key to use for caching.
 * @param {string} value - The value to cache.
 * @return {Promise<void>} A promise that resolves when the value is added to the cache.
 */
const addToCache = async (key: string, value: string) => {
	await redis.set(key, value);
};

/**
 * Removes a value from the cache with the given key.
 *
 * @param {string} key - The key to use for removing from cache.
 * @return {Promise<void>} A promise that resolves when the value is removed from the cache.
 */
const removeFromCache = async (key: string) => {
	await redis.del(key);
};

/**
 * Adds a value to the cache with the given key and sets a time to live (TTL) for the cached value.
 *
 * @param {string} key - The key to use for caching.
 * @param {string} value - The value to cache.
 * @param {number} ttl - The time to live (TTL) for the cached value in seconds.
 * @return {Promise<void>} A promise that resolves when the value is added to the cache with TTL.
 */
const addToCacheWithTTL = async (key: string, value: string, ttl: number) => {
	await redis.setex(key, ttl, value);
};

/**
 * Retrieves a value from the cache based on the given key.
 *
 * @param {string} key - The key to use for retrieving from cache.
 * @return {Promise<string | null>} A promise that resolves with the cached value, or null if the key is not found.
 */
const getFromCache = async (key: string) => {
	return await redis.get(key);
};

const isKeyPresent = async (key: string) => {
	const keyExists = await redis.exists(key);

	return keyExists > 0;
};

export default {
	addToCache,
	getFromCache,
	removeFromCache,
	addToCacheWithTTL,
	isKeyPresent,
};
