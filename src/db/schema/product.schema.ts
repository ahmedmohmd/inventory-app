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
import { sections } from "./section.schema";
// import { stocks } from "./stock.schema";
import { suppliers } from "./supplier.schema";

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
	status: productStatus("status"),

	// screenshot: varchar("screenshot", {
	// 	length: 255,
	// }).default(""),
	// screenshotPublicId: varchar("screenshotPublicId", {
	// 	length: 255,
	// }).default(""),

	sku: varchar("sku", {
		length: 25,
	}).notNull(),

	categoryId: integer("categoryId")
		.references(() => categories.id, {
			onDelete: "set null",
		})
		.notNull(),

	supplierId: integer("supplierId")
		.references(() => suppliers.id, {
			onDelete: "set null",
		})
		.notNull(),

	sectionId: integer("sectionId")
		.references(() => sections.id, {
			onDelete: "set null",
		})
		.notNull(),

	qty: integer("quantity").notNull(),

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

	supplier: one(suppliers, {
		fields: [products.supplierId],
		references: [suppliers.id],
	}),

	section: one(sections, {
		fields: [products.sectionId],
		references: [sections.id],
	}),

	// stocks: many(stocks),
}));

export type Product = InferInsertModel<typeof products>;
