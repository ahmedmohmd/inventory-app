import { InferInsertModel, relations } from "drizzle-orm";
import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { orders } from "./order.schema";
import { products } from "./product.schema";

export const orderItems = pgTable("order_items", {
	id: serial("id").primaryKey(),
	quantity: integer("quantity").notNull(),
	// price: integer("price").notNull(),

	orderId: integer("orderId")
		.notNull()
		.references(() => orders.id, {
			onDelete: "cascade",
		}),

	productId: integer("productId")
		.notNull()
		.references(() => products.id, {
			onDelete: "cascade",
		}),

	createdAt: timestamp("createdAt").notNull().defaultNow(),
	updatedAt: timestamp("updatedAt")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
	order: one(orders, {
		fields: [orderItems.orderId],
		references: [orders.id],
	}),

	product: one(products, {
		fields: [orderItems.productId],
		references: [products.id],
	}),
}));

export type Section = InferInsertModel<typeof orderItems>;
