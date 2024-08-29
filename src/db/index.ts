import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { ENV } from "../../config/env";
import { categories } from "./schema/category.schema";
import { orderItems } from "./schema/order-item.schema";
import { orders } from "./schema/order.schema";
import { productScreenshots } from "./schema/product-screenshot.schema";
import { products } from "./schema/product.schema";
import { sections } from "./schema/section.schema";
import { stocks } from "./schema/stock.schema";
import { suppliers } from "./schema/supplier.schema";
import { users } from "./schema/user.schema";
import { warehouses } from "./schema/warehouse.schema";

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
	schema: {
		users,
		categories,
		stocks,
		products,
		suppliers,
		sections,
		warehouses,
		productScreenshots,
		orders,
		orderItems,
	},
});
