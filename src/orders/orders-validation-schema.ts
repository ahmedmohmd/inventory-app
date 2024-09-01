import { z } from "zod";

const createOrderSchema = z.object({
	supplierId: z.string().regex(/^\d+$/),
	orderItems: z.array(
		z.object({
			productId: z.string().regex(/^\d+$/),
			quantity: z.string().regex(/^\d+$/),
		})
	),
});

const orderIdSchema = z.object({
	id: z.string().regex(/^\d+$/),
});

export { createOrderSchema, orderIdSchema };
