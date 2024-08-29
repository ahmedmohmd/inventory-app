import { InferInsertModel, relations } from "drizzle-orm";
import {
	integer,
	pgEnum,
	pgTable,
	serial,
	timestamp,
} from "drizzle-orm/pg-core";
import { orderItems } from "./order-item.schema";
import { suppliers } from "./supplier.schema";

export const OrderStatus = pgEnum("status", [
	"pending",
	"shipped",
	"processing",
	"cancelled",
	"delivered",
	"returned",
	"completed",
]);

export const orders = pgTable("orders", {
	id: serial("id").primaryKey(),
	status: OrderStatus("status").notNull(),
	total: integer("total").notNull(),
	supplierId: integer("supplierId").notNull(),

	createdAt: timestamp("createdAt").notNull().defaultNow(),
	updatedAt: timestamp("updatedAt")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const ordersRelations = relations(orders, ({ many, one }) => ({
	orderItems: many(orderItems),

	supplier: one(suppliers, {
		fields: [orders.supplierId],
		references: [suppliers.id],
	}),
}));

export type Section = InferInsertModel<typeof orders>;
