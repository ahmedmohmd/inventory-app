import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { ENV } from "../../config/env";
import * as categories from "./schema/category.schema";
import * as orderItems from "./schema/order-item.schema";
import * as orders from "./schema/order.schema";
import * as productScreenshots from "./schema/product-screenshot.schema";
import * as products from "./schema/product.schema";
import * as sections from "./schema/section.schema";
import * as stocks from "./schema/stock.schema";
import * as suppliers from "./schema/supplier.schema";
import * as users from "./schema/user.schema";
import * as warehouses from "./schema/warehouse.schema";

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
		...users,
		...categories,
		...stocks,
		...products,
		...suppliers,
		...sections,
		...warehouses,
		...productScreenshots,
		...orders,
		...orderItems,
	},
});
