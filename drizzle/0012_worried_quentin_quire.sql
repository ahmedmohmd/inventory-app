ALTER TABLE "products" DROP CONSTRAINT "products_categoryId_sections_id_fk";
--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_supplierId_sections_id_fk";
--> statement-breakpoint
ALTER TABLE "sections" DROP CONSTRAINT "sections_warehouseId_warehouses_id_fk";
--> statement-breakpoint
ALTER TABLE "stocks" DROP CONSTRAINT "stocks_warehouseId_warehouses_id_fk";
--> statement-breakpoint
ALTER TABLE "stocks" DROP CONSTRAINT "stocks_productId_warehouses_id_fk";
--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "quantity" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_supplierId_suppliers_id_fk" FOREIGN KEY ("supplierId") REFERENCES "public"."suppliers"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stocks" ADD CONSTRAINT "stocks_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "screenshot";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "screenshotPublicId";--> statement-breakpoint
ALTER TABLE "sections" DROP COLUMN IF EXISTS "warehouseId";--> statement-breakpoint
ALTER TABLE "stocks" DROP COLUMN IF EXISTS "warehouseId";