enum SortBy {
	PRICE = "price",
	// QUANTITY = "qty",
	NAME = "name",
}

enum OrderBy {
	ASC = "asc",
	DESC = "desc",
}

enum ProductStatus {
	RESERVED = "reserved",
	IN_STOCK = "in-stock",
	OUT_OF_STOCK = "out-of-stock",
	RETURNED = "returned",
	DAMAGED = "damaged",
}

export { SortBy, OrderBy, ProductStatus };
