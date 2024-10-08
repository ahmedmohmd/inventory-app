import { InferInsertModel, relations } from "drizzle-orm";
import {
	pgEnum,
	pgTable,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { products } from "./product.schema";

export const sectionName = pgEnum("section_name", [
	"A1",
	"B2",
	"C3",
	"D4",
	"E5",
	"F6",
	"G7",
	"H8",
	"I9",
	"J0",
]);

export const sections = pgTable("sections", {
	id: serial("id").primaryKey(),
	name: sectionName("name").notNull(),
	description: varchar("description", {
		length: 255,
	}),

	createdAt: timestamp("createdAt").notNull().defaultNow(),
	updatedAt: timestamp("updatedAt")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const sectionsRelations = relations(sections, ({ many }) => ({
	products: many(products),
}));

export type Section = InferInsertModel<typeof sections>;
