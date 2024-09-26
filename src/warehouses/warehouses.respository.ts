import { eq } from "drizzle-orm";
import { db } from "../db";
import { CreateWarehouse, UpdateWarehouse } from "./warehouses.types";
import { warehouses } from "../db/schema/warehouse.schema";

/**
 * Retrieves a list of all warehouses from the database.
 *
 * @return {object[]} A list of warehouse objects
 */
const findAllWarehouses = async () => {
	return await db.select().from(warehouses);
};

/**
 * Retrieves a warehouse from the database by its ID.
 *
 * @param {number} id - The ID of the warehouse to retrieve
 * @return {object} The warehouse object with the matching ID, or null if not found
 */
const findWarehouseById = async (id: number) => {
	return await db.query.warehouses.findFirst({
		where: eq(warehouses.id, id),
	});
};

/**
 * Retrieves a warehouse from the database by its name.
 *
 * @param {string} name - The name of the warehouse to retrieve
 * @return {object} The warehouse object with the matching name, or null if not found
 */
const findWarehouseByName = async (name: string) => {
	return await db.query.warehouses.findFirst({
		where: eq(warehouses.name, name),
	});
};

/**
 * Inserts a new warehouse into the database.
 *
 * @param {CreateWarehouse} data - The data for the new warehouse to be inserted
 * @return {object} The newly inserted warehouse object
 */
const insertWarehouse = async (data: CreateWarehouse) => {
	const [warehouse] = await db.insert(warehouses).values(data).returning();

	return warehouse;
};

/**
 * Updates a warehouse in the database.
 *
 * @param {number} id - The ID of the warehouse to update
 * @param {UpdateWarehouse} data - The updated warehouse data
 * @return {object} The updated warehouse object
 */
const updateWarehouse = async (id: number, data: UpdateWarehouse) => {
	const [warehouse] = await db
		.update(warehouses)
		.set(data)
		.where(eq(warehouses.id, id))
		.returning();

	return warehouse;
};

/**
 * Deletes a warehouse from the database by its ID.
 *
 * @param {number} id - The ID of the warehouse to delete
 * @return {void} No return value
 */
const deleteWarehouse = async (id: number) => {
	return await db.delete(warehouses).where(eq(warehouses.id, id)).execute();
};

export default {
	findAllWarehouses,
	findWarehouseById,
	insertWarehouse,
	updateWarehouse,
	deleteWarehouse,
	findWarehouseByName,
};
