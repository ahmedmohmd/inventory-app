import { and, DBQueryConfig, eq, SQL } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema/user.schema";
import { CreateUser, FindAllUsersQuery, UpdateUser } from "./users.types";

/**
 * Finds a user by their ID.
 *
 * @param {number} id - The ID of the user.
 * @return {Promise<User | null>} A Promise that resolves to the user with the given ID, or null if not found.
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
 * @return {Promise<User | null>} A Promise that resolves to the user object if found, or null if not found.
 */
const findUserByEmail = async (email: string) => {
	return await db.query.users.findFirst({
		where: eq(users.email, email),
	});
};

/**
 * Retrieves a list of users from the database based on the provided query parameters.
 *
 * @param {FindAllUsersQuery} query - An object containing query parameters to filter users.
 * @return {Promise<User[]>} A Promise that resolves to an array of user objects.
 */
const findAllUsers = async ({ active, role }: FindAllUsersQuery) => {
	const andConditions: SQL<unknown>[] = [];

	if (active) {
		andConditions.push(eq(users.isActive, active));
	}

	if (role) {
		andConditions.push(eq(users.role, role));
	}

	const queryOptions: DBQueryConfig = {
		where: and(...andConditions),
	};

	return await db.query.users.findMany(queryOptions);
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
		role: users.role,
		profileImage: users.profileImage,
		isActive: users.isActive,
		createdAt: users.createdAt,
		updatedAt: users.updatedAt,
	});

	return createdUser[0];
};

/**
 * Updates a user in the database.
 *
 * @param {number} id - The ID of the user to be updated.
 * @param {UpdateUser} userData - The updated user data.
 * @return {Promise<User>} The updated user object.
 */
const updateUser = async (id: number, userData: UpdateUser) => {
	return await db
		.update(users)
		.set(userData)
		.where(eq(users.id, id))
		.returning();
};

/**
 * Deletes a user from the database.
 *
 * @param {number} id - The ID of the user to be deleted.
 * @return {Promise<void>} A promise that resolves when the deletion is complete.
 */
const deleteUser = async (id: number) => {
	return await db.delete(users).where(eq(users.id, id)).execute();
};

/**
 * Finds a user by their reset password token.
 *
 * @param {string} resetToken - The reset password token of the user.
 * @return {Promise<User | null>} A Promise that resolves to the user with the given reset password token, or null if not found.
 */
const findUserByResetToken = async (resetToken: string) => {
	return await db.query.users.findFirst({
		where: eq(users.resetPasswordToken, resetToken),
	});
};

export default {
	deleteUser,
	findAllUsers,
	findUserByEmail,
	findUserById,
	insertUser,
	updateUser,
	findUserByResetToken,
};
