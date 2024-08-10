import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema/user.schema";
import { CreateUser, UpdateUser } from "./users.types";

class User {
	static async findUserById(id: number) {
		return await db.query.users.findFirst({
			where: eq(users.id, id),
		});
	}

	static async findUserByEmail(email: string) {
		return await db.query.users.findFirst({
			where: eq(users.email, email),
		});
	}

	static async findAllUsers() {
		return await db.select().from(users);
	}

	static async insertUser(userData: CreateUser) {
		return await db.insert(users).values(userData);
	}

	static async updateUser(id: number, userData: UpdateUser) {
		return await db.update(users).set(userData);
	}

	static async deleteUser(id: number) {
		return await db.delete(users).where(eq(users.id, id)).execute();
	}
}

export { User };
