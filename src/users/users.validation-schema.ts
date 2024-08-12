import { z } from "zod";

const createUserSchema = z.object({
	email: z.string().email(),
	password: z.string(),
	name: z.string(),
});

const updateUserSchema = z.object({
	email: z.string().email().optional(),
	password: z.string().optional(),
	name: z.string().optional(),
});

const userIdSchema = z.object({
	id: z.string().regex(/^\d+$/),
});

export { createUserSchema, updateUserSchema, userIdSchema };
