DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('reserved', 'in-stock', 'out-of-stock', 'returned', 'damaged');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(25) NOT NULL,
	"description" varchar(255),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(25) NOT NULL,
	"description" varchar(255),
	"price" integer NOT NULL,
	"qty" integer NOT NULL,
	"status" "status",
	"categoryId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "role";