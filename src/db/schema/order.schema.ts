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
import { warehouses } from "./warehouse.schema";

export const OrderStatus = pgEnum("order_status", [
	"pending",
	"completed",
	// "pending",
	// "shipped",
	// "processing",
	// "cancelled",
	// "delivered",
	// "returned",
	// "completed",
]);

export const orders = pgTable("orders", {
	id: serial("id").primaryKey(),
	status: OrderStatus("status").default("pending").notNull(),
	total: integer("total").notNull(),
	supplierId: integer("supplierId")
		.references(() => suppliers.id, {
			onDelete: "set null",
		})
		.notNull(),

	warehouseId: integer("warehouseId")
		.notNull()
		.references(() => warehouses.id, {
			onDelete: "set null",
		})
		.notNull(),

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
	warehouse: one(warehouses, {
		fields: [orders.warehouseId],
		references: [warehouses.id],
	}),
}));

export type Section = InferInsertModel<typeof orders>;
