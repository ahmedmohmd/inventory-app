const warehousesSchema = {
	index: "warehouses",
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

				name: {
					type: "keyword",
				},

				description: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
							ignore_above: 256,
						},
					},
				},

				location: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
							ignore_above: 256,
						},
					},
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

export { warehousesSchema };
