import { z } from "zod";

const createSupplierSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	phone: z.string(),
	address: z.string(),
});

const updateSupplierSchema = z.object({
	name: z.string().optional(),
	email: z.string().email().optional(),
	phone: z.string().optional(),
	address: z.string().optional(),
});

const supplierIdSchema = z.object({
	id: z.string().regex(/^\d+$/),
});

const findAllSuppliersQuerySchema = z.object({
	limit: z.string().regex(/^\d+$/).optional(),
	page: z.string().regex(/^\d+$/).optional(),
});

export default {
	createSupplierSchema,
	supplierIdSchema,
	updateSupplierSchema,
	findAllSuppliersQuerySchema,
};
