import { z } from "zod";

const signInSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

const resetPasswordRequestSchema = z.object({
	email: z.string().email(),
});

const resetPasswordQuerySchema = z.object({
	resetToken: z.string(),
});

const resetPasswordSchema = z.object({
	password: z.string(),
});

export {
	resetPasswordQuerySchema,
	resetPasswordRequestSchema,
	resetPasswordSchema,
	signInSchema,
};
