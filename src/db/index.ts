import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { users } from "./schema/user.schema";

const client = new Client({
	connectionString: "postgres://postgres:95123574@localhost:5433/express",
});

export async function connectToDatabase() {
	await client.connect();
}

export const db = drizzle(client, {
	schema: { users },
});
