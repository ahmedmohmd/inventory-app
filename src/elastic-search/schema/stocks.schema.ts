const stocksSchema = {
	index: "stocks",
	body: {
		settings: {
			index: {
				number_of_shards: 6,
				number_of_replicas: 3,
			},
		},
		mappings: {
			properties: {
				id: {
					type: "keyword",
				},

				warehouse: {
					type: "keyword",
				},

				product: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
							ignore_above: 256,
						},
					},
				},

				quantity: {
					type: "integer",
				},

				createdAt: {
					type: "date",
					format: "yyyy-MM-dd HH:mm:ss",
				},

				updatedAt: {
					type: "date",
					format: "yyyy-MM-dd HH:mm:ss",
				},
			},
		},
	},
};

export { stocksSchema };
