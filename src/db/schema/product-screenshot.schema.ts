import { InferInsertModel, relations } from "drizzle-orm";
import {
	integer,
	pgTable,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { products } from "./product.schema";

export const productScreenshots = pgTable("productScreenshots", {
	id: serial("id").primaryKey(),
	url: varchar("url", {
		length: 255,
	}),
	publicId: varchar("publicId", {
		length: 255,
	}),

	productId: integer("productId")
		.references(() => products.id, {
			onDelete: "cascade",
		})
		.notNull(),

	createdAt: timestamp("createdAt").notNull().defaultNow(),
	updatedAt: timestamp("updatedAt")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const productScreenshotsRelations = relations(
	productScreenshots,
	({ one }) => ({
		products: one(products, {
			fields: [productScreenshots.productId],
			references: [products.id],
		}),
	})
);

export type ProductScreenshot = InferInsertModel<typeof productScreenshots>;
