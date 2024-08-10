import { InferInsertModel } from "drizzle-orm";
import {
	pgEnum,
	pgTable,
	serial,
	timestamp,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("role", ["admin", "moderator", "user"]);

export const users = pgTable(
	"users",
	{
		id: serial("id").primaryKey().notNull(),
		name: varchar("name", {
			length: 25,
		}).notNull(),
		email: varchar("email", {
			length: 25,
		})
			.notNull()
			.unique(),
		password: varchar("password", {
			length: 50,
		}).notNull(),
		createdAt: timestamp("createdAt").defaultNow(),
		updatedAt: timestamp("updatedAt")
			.defaultNow()
			.$onUpdate(() => new Date()),
	},
	(table) => ({
		emailIdx: uniqueIndex("email_idx").on(table.email),
	})
);

export type User = InferInsertModel<typeof users>;
