import { eq } from "drizzle-orm";
import { db } from "../db";
import { warehouses } from "../db/schema/warehouse.schema";
import { CreateWarehouse, UpdateWarehouse } from "./warehouses.types";

/**
 * Retrieves a list of all warehouses from the database.
 *
 * @return {object[]} A list of warehouse objects
 */
const findAllWarehouses = async () => {
	return await db.select().from(warehouses);
};

const findWarehouseById = async (id: number) => {
	return await db.query.warehouses.findFirst({
		where: eq(warehouses.id, id),
	});
};

const findWarehouseByName = async (name: string) => {
	return await db.query.sections.findFirst({
		where: eq(warehouses.name, name),
	});
};

const insertWarehouse = async (data: CreateWarehouse) => {
	return await db.insert(warehouses).values(data).returning();
};

const updateWarehouse = async (id: number, data: UpdateWarehouse) => {
	return await db
		.update(warehouses)
		.set(data)
		.where(eq(warehouses.id, id))
		.returning();
};

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
