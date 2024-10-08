const productsIndex = {
	settings: {
		number_of_shards: 6,
		number_of_replicas: 3,
	},

	mappings: {
		properties: {
			id: {
				type: "keyword",
			},

			name: {
				type: "text",
				fields: {
					keyword: {
						type: "keyword",
						ignore_above: 256,
					},
					completion: {
						type: "completion",
					},
				},
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

			price: {
				type: "float",
			},

			status: {
				type: "keyword",
			},

			sku: {
				type: "keyword",
			},

			color: {
				type: "keyword",
			},

			brand: {
				type: "keyword",
			},

			sectionId: {
				type: "integer",
			},

			categoryId: {
				type: "integer",
			},

			supplierId: {
				type: "integer",
			},

			createdAt: {
				type: "date",
			},

			updatedAt: {
				type: "date",
			},
		},
	},
};

export { productsIndex };
