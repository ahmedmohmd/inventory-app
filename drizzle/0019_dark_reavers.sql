ALTER TABLE "productScreenshots" RENAME TO "product_screenshots";--> statement-breakpoint
ALTER TABLE "product_screenshots" DROP CONSTRAINT "productScreenshots_productId_products_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_screenshots" ADD CONSTRAINT "product_screenshots_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
