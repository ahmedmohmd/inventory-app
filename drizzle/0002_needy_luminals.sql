ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE varchar(72);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "users" USING btree ("email");