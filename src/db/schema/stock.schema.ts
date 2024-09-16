import { InferInsertModel, relations } from "drizzle-orm";
import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { products } from "./product.schema";
import { warehouses } from "./warehouse.schema";

export const stocks = pgTable("stocks", {
	id: serial("id").primaryKey(),

	warehouseId: integer("warehouseId")
		.references(() => warehouses.id, {
			onDelete: "set null",
		})
		.notNull(),

	productId: integer("productId")
		.references(() => products.id, {
			onDelete: "set null",
		})
		.notNull(),

	quantity: integer("quantity").notNull().default(0),

	createdAt: timestamp("createdAt").notNull().defaultNow(),
	updatedAt: timestamp("updatedAt")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const stocksRelations = relations(stocks, ({ one }) => ({
	product: one(products, {
		fields: [stocks.productId],
		references: [products.id],
	}),
	warehouse: one(warehouses, {
		fields: [stocks.warehouseId],
		references: [warehouses.id],
	}),
}));

export type Stock = InferInsertModel<typeof stocks>;
