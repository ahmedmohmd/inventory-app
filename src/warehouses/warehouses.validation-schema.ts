import { z } from "zod";

const createWarehouseSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	location: z.string(),
});

const updateWarehouseSchema = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
	location: z.string().optional(),
});

const warehouseIdSchema = z.object({
	id: z.string().regex(/^\d+$/),
});

export default {
	warehouseIdSchema,
	createWarehouseSchema,
	updateWarehouseSchema,
};
