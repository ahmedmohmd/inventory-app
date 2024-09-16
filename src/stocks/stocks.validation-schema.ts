import { z } from "zod";

const createStockSchema = z.object({
	productId: z.number(),
	warehouseId: z.number(),
	quantity: z.number(),
});

const updateStockSchema = z.object({
	quantity: z.number().optional(),
});

const stockIdSchema = z.object({
	id: z.string().regex(/^\d+$/),
});

export default {
	stockIdSchema,
	createStockSchema,
	updateStockSchema,
};
