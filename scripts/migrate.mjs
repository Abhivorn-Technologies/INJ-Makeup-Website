// Creates the enquiries table. Usage: DATABASE_URL=... npm run db:migrate
import { readFile } from "node:fs/promises";
import pg from "pg";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}
const local = /localhost|127\.0\.0\.1|sslmode=disable/.test(url);
const client = new pg.Client({ connectionString: url, ssl: local ? undefined : { rejectUnauthorized: process.env.DATABASE_SSL_NO_VERIFY !== "true" } });
await client.connect();
await client.query(await readFile(new URL("../db/schema.sql", import.meta.url), "utf8"));
await client.end();
console.log("✓ enquiries table is ready");
