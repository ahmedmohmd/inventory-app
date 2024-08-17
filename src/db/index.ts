import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { ENV } from "../../config/env";
import { categories } from "./schema/category.schema";
import { products } from "./schema/product.schema";
import { users } from "./schema/user.schema";

const client = new Client({
	connectionString: ENV.DB_URL,
});

export async function connectToDatabase() {
	await client.connect();
}

export async function disconnectFromDatabase() {
	await client.end();
}

export const db = drizzle(client, {
	schema: { users, categories, products },
});
