import { z } from "zod";
import { Role } from "../common/enums/user-role.enum";

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

const UserRoleSchema = z.enum([Role.ADMIN, Role.EMPLOYEE]);

const findAllUsersQuerySchema = z.object({
	role: UserRoleSchema.optional(),
	active: z.boolean().optional(),
});

export default {
	createUserSchema,
	userIdSchema,
	updateUserSchema,
	findAllUsersQuerySchema,
};
