import { InferInsertModel, relations } from "drizzle-orm";
import {
	pgTable,
	serial,
	timestamp,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core";
import { products } from "./product.schema";

// export const categoryName = pgEnum("category_name", [
// 	"pc",
// 	"storage",
// 	"accessories",
// ]);

export const categories = pgTable(
	"categories",
	{
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
	},
	(table) => ({
		nameIdx: uniqueIndex("name_idx").on(table.name),
	})
);

export const categoriesRelations = relations(categories, ({ many }) => ({
	products: many(products),
}));

export type Category = InferInsertModel<typeof categories>;
