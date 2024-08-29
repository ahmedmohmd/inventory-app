// import { sql } from "drizzle-orm";
// import { connectToDatabase, db, disconnectFromDatabase } from "./src/db";
// import { migrateDatabase } from "./src/db/migrate";
// import { seedDataBase } from "./src/db/seed";

export async function setup() {
	// await connectToDatabase();
	// await migrateDatabase();
	// await seedDataBase();
}

export async function teardown() {
	// await db.execute(sql`TRUNCATE TABLE users RESTART IDENTITY CASCADE;`);
	// await db.execute(sql`TRUNCATE TABLE categories RESTART IDENTITY CASCADE;`);
	// await db.execute(sql`TRUNCATE TABLE products RESTART IDENTITY CASCADE;`);
	// await disconnectFromDatabase();
}
