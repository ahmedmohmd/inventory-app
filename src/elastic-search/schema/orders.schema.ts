const ordersIndex = {
	settings: {
		number_of_shards: 6,
		number_of_replicas: 3,
	},

	mappings: {
		properties: {
			id: {
				type: "keyword",
			},

			status: {
				type: "keyword",
			},

			total: {
				type: "integer",
			},

			supplierId: {
				type: "integer",
			},

			warehouseId: {
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

export { ordersIndex };
