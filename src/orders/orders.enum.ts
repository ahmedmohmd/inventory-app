export enum OrderStatus {
	PENDING = "pending",
	COMPLETED = "completed",
}

export enum OrdersSortKey {
	CREATED_AT = "createdAt",
	TOTAL = "total",
}

export default {
	OrderStatus,
	OrdersSortKey,
};
