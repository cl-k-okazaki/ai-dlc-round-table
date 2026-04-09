import {
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
});
