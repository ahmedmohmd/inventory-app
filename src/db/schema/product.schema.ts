import { InferInsertModel, relations } from "drizzle-orm";
import {
	integer,
	pgEnum,
	pgTable,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { categories } from "./category.schema";

export const productStatus = pgEnum("status", [
	"reserved",
	"in-stock",
	"out-of-stock",
	"returned",
	"damaged",
]);

export const products = pgTable("products", {
	id: serial("id").primaryKey(),
	name: varchar("name", {
		length: 25,
	}).notNull(),
	description: varchar("description", {
		length: 255,
	}),
	price: integer("price").notNull(),
	qty: integer("qty").notNull(),
	status: productStatus("status"),

	categoryId: integer("categoryId").notNull(),

	createdAt: timestamp("createdAt").notNull().defaultNow(),
	updatedAt: timestamp("updatedAt")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const productsRelations = relations(products, ({ one }) => ({
	category: one(categories, {
		fields: [products.categoryId],
		references: [categories.id],
	}),
}));

export type Product = InferInsertModel<typeof products>;
