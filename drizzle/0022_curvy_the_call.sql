ALTER TABLE "orders" ADD COLUMN "warehouseId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "stocks" ADD COLUMN "warehouseId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "stocks" ADD COLUMN "quantity" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "warehouses" ADD COLUMN "description" varchar(255);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_warehouseId_warehouses_id_fk" FOREIGN KEY ("warehouseId") REFERENCES "public"."warehouses"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stocks" ADD CONSTRAINT "stocks_warehouseId_warehouses_id_fk" FOREIGN KEY ("warehouseId") REFERENCES "public"."warehouses"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "quantity";