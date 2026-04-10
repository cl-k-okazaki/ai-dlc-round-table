import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });
config({ path: ".env.local", override: true });

const databaseUrl =
  process.env.DATABASE_URL ?? process.env.NETLIFY_DATABASE_URL;

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl!,
  },
});
