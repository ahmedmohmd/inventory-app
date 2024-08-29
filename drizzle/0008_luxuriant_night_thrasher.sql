ALTER TYPE "role" ADD VALUE 'employee';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "isActive" boolean DEFAULT false NOT NULL;