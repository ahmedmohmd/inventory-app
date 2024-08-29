import { InferInsertModel } from "drizzle-orm";
import {
	boolean,
	pgEnum,
	pgTable,
	serial,
	timestamp,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("role", ["admin", "employee"]);

export const users = pgTable(
	"users",
	{
		id: serial("id").primaryKey(),
		name: varchar("name", {
			length: 25,
		}).notNull(),
		email: varchar("email", {
			length: 25,
		})
			.notNull()
			.unique(),
		password: varchar("password", {
			length: 72,
		}).notNull(),
		role: userRole("role"),

		profileImage: varchar("profileImage", {
			length: 255,
		}).default(""),
		profileImagePublicId: varchar("profileImagePublicId", {
			length: 255,
		}).default(""),

		isActive: boolean("isActive").default(false).notNull(),

		resetPasswordToken: varchar("resetPasswordToken").default(""),

		createdAt: timestamp("createdAt").notNull().defaultNow(),
		updatedAt: timestamp("updatedAt")
			.notNull()
			.defaultNow()
			.$onUpdate(() => new Date()),
	},
	(table) => ({
		emailIdx: uniqueIndex("email_idx").on(table.email),
	})
);

export type User = InferInsertModel<typeof users>;
