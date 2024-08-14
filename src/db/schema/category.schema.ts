import { InferInsertModel, relations } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { products } from "./product.schema";

export const categories = pgTable("categories", {
	id: serial("id").primaryKey(),
	name: varchar("name", {
		length: 25,
	}).notNull(),
	description: varchar("description", {
		length: 255,
	}),
	createdAt: timestamp("createdAt").notNull().defaultNow(),
	updatedAt: timestamp("updatedAt")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
	products: many(products),
}));

export type Category = InferInsertModel<typeof categories>;
