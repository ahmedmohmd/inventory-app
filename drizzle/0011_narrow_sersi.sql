CREATE TABLE IF NOT EXISTS "productScreenshots" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" varchar(255),
	"publicId" varchar(255),
	"productId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productScreenshots" ADD CONSTRAINT "productScreenshots_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
