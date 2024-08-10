DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('admin', 'moderator', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar(25) NOT NULL,
	"email" varchar(25) NOT NULL,
	"password" varchar(50) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
