DO $$ BEGIN
 CREATE TYPE "public"."product_brands" AS ENUM('apple', 'asus', 'hp', 'lenovo', 'microsoft', 'nokia', 'sony', 'toshiba', 'xiaomi', 'acer', 'hp');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "brand" SET DATA TYPE product_brands;