import { migrate } from "drizzle-orm/node-postgres/migrator";
import path from "path";
import { db } from ".";

const migrationFolderPath = path.join(__dirname, "..", "..", "drizzle");

const migrateDatabase = async () => {
	await migrate(db, { migrationsFolder: migrationFolderPath });
};

export { migrateDatabase };
