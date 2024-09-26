import client from "./client";
import logger from "../logging";
import { productsIndex } from "./schema/products.schema";
import { ordersIndex } from "./schema/orders.schema";

const createIndex = async (
	name: string,
	body?: {
		mappings: object;
		settings: object;
	}
) => {
	const isIndexExists = await client.indices.exists({
		index: name,
	});

	if (isIndexExists) {
		return;
	}

	if (body) {
		await client.indices.create({
			index: name,
			mappings: body.mappings,
			settings: body.settings,
		});
	} else {
		await client.indices.create({
			index: name,
		});
	}
};

const deleteIndex = async (name: string) => {
	await client.indices.delete({
		index: name,
	});
};

const addToIndex = async (name: string, body: object, id?: string) => {
	await client.index({
		index: name,
		body: body,
		id: id,
	});
};

const deleteFromIndex = async (name: string, id: string) => {
	await client.delete({
		index: name,
		id: id,
	});
};

const updateIndex = async (name: string, id: string, body: object) => {
	await client.update({
		index: name,
		id: id,
		body: {
			doc: body,
		},
	});
};

const updateAllIndex = async (name: string, body: object) => {
	let scriptSource = "";
	const scriptParams = {};

	for (const field in body) {
		scriptSource += `if (params.${field} != null) { ctx._source.${field} = params.${field}; } `;
		scriptParams[field] = body[field];
	}

	const { updated } = await client.updateByQuery({
		index: "your_index",
		body: {
			script: {
				source: scriptSource.trim(),
				params: scriptParams,
			},
			query: {
				match_all: {},
			},
		},
	});

	return updated;
};

const createAllIndices = async () => {
	logger.info.info(`creating all indices...`);

	await createIndex("products", productsIndex);
	await createIndex("orders", ordersIndex);

	logger.info.info(`done creating all indices`);
};

export default {
	deleteIndex,
	addToIndex,
	createAllIndices,
	deleteFromIndex,
	updateAllIndex,
	updateIndex,
};
