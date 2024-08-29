import { eq } from "drizzle-orm";
import { db } from "../db";
import { suppliers } from "../db/schema/supplier.schema";
import { CreateSupplier } from "./suppliers.types";

const findAllSuppliers = async () => {
	return await db.select().from(suppliers);
};

const findSupplierById = async (id: number) => {
	return await db.query.suppliers.findFirst({
		where: eq(suppliers.id, id),
	});
};

const findSupplierByEmail = async (email: string) => {
	return await db.query.suppliers.findFirst({
		where: eq(suppliers.email, email),
	});
};

const insertSupplier = async (data: CreateSupplier) => {
	return await db.insert(suppliers).values(data).returning();
};

const updateSupplier = async (id: number, data: CreateSupplier) => {
	return await db
		.update(suppliers)
		.set(data)
		.where(eq(suppliers.id, id))
		.returning();
};

const deleteSupplier = async (id: number) => {
	return await db.delete(suppliers).where(eq(suppliers.id, id)).execute();
};

export {
	deleteSupplier,
	findAllSuppliers,
	findSupplierByEmail,
	findSupplierById,
	insertSupplier,
	updateSupplier,
};
