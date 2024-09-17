import { migrateDatabase } from "../db/migrate";

const handleDbMigration = async () => {
	await migrateDatabase();
};

export default handleDbMigration;
