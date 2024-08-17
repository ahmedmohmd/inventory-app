import { db } from ".";
import { categories } from "./schema/category.schema";
import { users } from "./schema/user.schema";

const seedDataBase = async () => {
	// insert fake user
	await db.insert(users).values({
		name: "Ahmed",
		email: "ahmed@example.com",
		password: "password",
		role: "admin",
	});

	// insert fake category
	await db.insert(categories).values({
		name: "Electronics",
		description: "Electronics category.",
	});
};

export { seedDataBase };
