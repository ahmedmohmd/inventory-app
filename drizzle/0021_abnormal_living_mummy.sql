DO $$ BEGIN
 CREATE TYPE "public"."category_name" AS ENUM('accessories', 'games', 'networks', 'offices', 'pc', 'peripherals', 'smart_home', 'software', 'storage', 'pc_components');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DROP INDEX IF EXISTS "name_idx";--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "category_name" "category_name" NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "name_idx" ON "categories" USING btree ("category_name");--> statement-breakpoint
ALTER TABLE "categories" DROP COLUMN IF EXISTS "name";