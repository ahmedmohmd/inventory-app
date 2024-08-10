import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema/user.schema";
import { CreateUser, UpdateUser } from "./users.types";

const findUserById = async (id: number) => {
	return await db.query.users.findFirst({
		where: eq(users.id, id),
	});
};

const findUserByEmail = async (email: string) => {
	return await db.query.users.findFirst({
		where: eq(users.email, email),
	});
};

const findAllUsers = async () => {
	return await db.select().from(users);
};

const insertUser = async (userData: CreateUser) => {
	return await db.insert(users).values(userData);
};

const updateUser = async (id: number, userData: UpdateUser) => {
	return await db.update(users).set(userData);
};

const deleteUser = async (id: number) => {
	return await db.delete(users).where(eq(users.id, id)).execute();
};

export default {
	deleteUser,
	findAllUsers,
	findUserByEmail,
	findUserById,
	insertUser,
	updateUser,
};
