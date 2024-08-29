import { InferInsertModel, relations } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { products } from "./product.schema";

export const suppliers = pgTable("suppliers", {
	id: serial("id").primaryKey(),

	name: varchar("name", {
		length: 50,
	}).notNull(),

	email: varchar("email", {
		length: 25,
	}).notNull(),

	phone: varchar("phone", {
		length: 25,
	}).notNull(),

	address: varchar("address", {
		length: 255,
	}).notNull(),

	createdAt: timestamp("createdAt").notNull().defaultNow(),
	updatedAt: timestamp("updatedAt")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const suppliersRelations = relations(suppliers, ({ many }) => ({
	products: many(products),
}));

export type Supplier = InferInsertModel<typeof suppliers>;
