DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_supplierId_suppliers_id_fk" FOREIGN KEY ("supplierId") REFERENCES "public"."suppliers"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
