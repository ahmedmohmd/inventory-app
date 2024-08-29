import { InferInsertModel, relations } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { sections } from "./section.schema";
import { stocks } from "./stock.schema";

export const warehouses = pgTable("warehouses", {
	id: serial("id").primaryKey(),

	name: varchar("name", {
		length: 50,
	}).notNull(),

	location: varchar("location", {
		length: 255,
	}).notNull(),

	createdAt: timestamp("createdAt").notNull().defaultNow(),
	updatedAt: timestamp("updatedAt")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const warehousesRelations = relations(warehouses, ({ many }) => ({
	stocks: many(stocks),
	sections: many(sections),
}));

export type Warehouse = InferInsertModel<typeof warehouses>;
