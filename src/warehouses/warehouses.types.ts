export type CreateWarehouse = {
	name: string;
	description?: string;
	location: string;
};

export type UpdateWarehouse = Partial<CreateWarehouse>;
