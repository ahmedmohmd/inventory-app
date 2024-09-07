import { eq } from "drizzle-orm";
import { db } from "../db";
import { suppliers } from "../db/schema/supplier.schema";
import { CreateSupplier, FindAllSuppliersQuery } from "./suppliers.types";
import { config } from "../../config/config";

/**
 * Retrieves a list of all suppliers from the database.
 *
 * @param {FindAllSuppliersQuery} query - The query parameters to filter suppliers by.
 * @return {Promise<any[]>} A promise that resolves to an array of supplier objects.
 */
const findAllSuppliers = async (query: FindAllSuppliersQuery) => {
	const limit = Number(query.limit) || config.pagination.limit;
	const page = Number(query.page) || config.pagination.page;

	return await db.query.suppliers.findMany({
		limit: limit,
		offset: (page - 1) * limit,
	});
};

/**
 * Retrieves a supplier from the database by their unique identifier.
 *
 * @param {number} id - The unique identifier of the supplier to retrieve.
 * @return {Promise<object | null>} The supplier object if found, otherwise null.
 */
const findSupplierById = async (id: number) => {
	return await db.query.suppliers.findFirst({
		where: eq(suppliers.id, id),
	});
};

/**
 * Finds a supplier by their email.
 *
 * @param {string} email - The email of the supplier to find.
 * @return {Promise<object | null>} A promise that resolves to the supplier object if found, otherwise null.
 */
const findSupplierByEmail = async (email: string) => {
	return await db.query.suppliers.findFirst({
		where: eq(suppliers.email, email),
	});
};

/**
 * Inserts a new supplier into the database.
 *
 * @param {CreateSupplier} data - The data for the new supplier to be inserted.
 * @return {Promise<object>} A promise that resolves to the newly inserted supplier object.
 */
const insertSupplier = async (data: CreateSupplier) => {
	return await db.insert(suppliers).values(data).returning();
};

/**
 * Updates a supplier in the database with the given ID.
 *
 * @param {number} id - The unique identifier of the supplier to update.
 * @param {CreateSupplier} data - The updated supplier data.
 * @return {Promise<object>} A promise that resolves to the updated supplier object.
 */
const updateSupplier = async (id: number, data: CreateSupplier) => {
	return await db
		.update(suppliers)
		.set(data)
		.where(eq(suppliers.id, id))
		.returning();
};

/**
 * Deletes a supplier by their ID from the database.
 *
 * @param {number} id - The unique identifier of the supplier to delete.
 * @return {Promise<void>} A promise that resolves with the result of the deletion operation.
 */
const deleteSupplier = async (id: number) => {
	return await db.delete(suppliers).where(eq(suppliers.id, id)).execute();
};

/**
 * Retrieves the total number of suppliers in the database.
 *
 * @return {number} The total number of suppliers.
 */
const countAllSuppliers = async () => {
	return (await db.query.suppliers.findMany()).length;
};

export default {
	deleteSupplier,
	findAllSuppliers,
	findSupplierByEmail,
	findSupplierById,
	insertSupplier,
	updateSupplier,
	countAllSuppliers,
};
