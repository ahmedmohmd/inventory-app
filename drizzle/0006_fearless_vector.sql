DO $$ BEGIN
 CREATE TYPE "public"."sectionName" AS ENUM('A1', 'B2', 'C3', 'D4', 'E5', 'F6', 'G7', 'H8', 'I9', 'J0');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "role" ADD VALUE 'moderator';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sections" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" "sectionName" NOT NULL,
	"description" varchar(255),
	"warehouseId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stocks" (
	"id" serial PRIMARY KEY NOT NULL,
	"warehouseId" integer NOT NULL,
	"productId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "suppliers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"email" varchar(25) NOT NULL,
	"phone" varchar(25) NOT NULL,
	"address" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "warehouses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"location" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "screenshot" varchar(255) DEFAULT '';--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "screenshotPublicId" varchar(255) DEFAULT '';--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "supplierId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "sectionId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "profileImage" varchar(255) DEFAULT '';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "profileImagePublicId" varchar(255) DEFAULT '';--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "name_idx" ON "categories" USING btree ("name");--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "qty";