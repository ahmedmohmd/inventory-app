import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema/user.schema";
import { CreateUser, UpdateUser } from "./users.types";

/**
 * Retrieves a user from the database by their unique identifier.
 *
 * @param {number} id - The unique identifier of the user to retrieve.
 * @return {Promise<User>} The user object if found, or undefined if not found.
 */
const findUserById = async (id: number) => {
	return await db.query.users.findFirst({
		where: eq(users.id, id),
	});
};

/**
 * Retrieves a user from the database by their email address.
 *
 * @param {string} email - The email address of the user to retrieve.
 * @return {Promise<User>} The user object if found, or undefined if not found.
 */
const findUserByEmail = async (email: string) => {
	return await db.query.users.findFirst({
		where: eq(users.email, email),
	});
};

/**
 * Retrieves all users from the database.
 *
 * @return {Promise<User[]>} An array of user objects.
 */
const findAllUsers = async () => {
	return await db.select().from(users);
};

/**
 * Inserts a new user into the database.
 *
 * @param {CreateUser} userData - The data for the new user to be inserted.
 * @return {Promise<User>} The newly inserted user object.
 */
const insertUser = async (userData: CreateUser) => {
	const createdUser = await db.insert(users).values(userData).returning({
		id: users.id,
		name: users.name,
		email: users.email,
		password: users.password,
		role: users.role,
		createdAt: users.createdAt,
		updatedAt: users.updatedAt,
	});

	return createdUser[0];
};

/**
 * Updates a user in the database with the provided user data.
 *
 * @param {number} id - The ID of the user to update.
 * @param {UpdateUser} userData - The data to update the user with.
 * @return {void}
 */
const updateUser = async (id: number, userData: UpdateUser) => {
	for (const field of Object.keys(userData)) {
		// eslint-disable-next-line
		await db
			.update(users)
			.set({ [field]: userData[field as keyof UpdateUser] });
	}

	return;
};

/**
 * Deletes a user from the database.
 *
 * @param {number} id - The ID of the user to delete.
 * @return {Promise<void>} The result of the deletion operation.
 */
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
