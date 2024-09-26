DO $$ BEGIN
 CREATE TYPE "public"."product_colors" AS ENUM('blue', 'red', 'green', 'gray', 'black', 'white', 'orange', 'yellow', 'purple');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "color" "product_colors" NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "brand" varchar(25) NOT NULL;