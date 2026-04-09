ALTER TABLE "comments" ALTER COLUMN "comment" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;