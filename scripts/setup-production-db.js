// One-time script: run migrations + copy products to production Supabase.
// Usage: node scripts/setup-production-db.js
const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

// Production Postgres (from Vercel env vars)
// Use sslmode=disable in URL but enable SSL via options to handle self-signed certs
const PROD_DB_URL =
  "postgres://postgres.apccsrnonjesobtpbgzn:WUwIjnVLS6PhOvFl@aws-0-us-east-1.pooler.supabase.com:5432/postgres";

// Local Supabase project via REST (has the products)
const LOCAL_URL = "https://avrcxvuqfdsufztsezku.supabase.co";
const LOCAL_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2cmN4dnVxZmRzdWZ6dHNlemt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxNzIyMjYsImV4cCI6MjEwNTc0ODIyNn0.LJh9cjq4ln6DXXitH6L9CQDWh-P0dPu1nk64Ao9V8G8";

async function runMigrations(client) {
  const migrationsDir = path.join(__dirname, "..", "supabase", "migrations");
  const files = fs.readdirSync(migrationsDir).sort();

  for (const file of files) {
    if (!file.endsWith(".sql")) continue;
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    console.log(`\nRunning migration: ${file}`);
    try {
      await client.query(sql);
      console.log("  OK");
    } catch (err) {
      // Many statements are idempotent (if not exists, duplicate_object, etc.)
      console.log(`  Warning: ${err.message}`);
    }
  }
}

async function fetchLocalProducts() {
  const res = await fetch(`${LOCAL_URL}/rest/v1/products?select=*`, {
    headers: {
      apikey: LOCAL_ANON_KEY,
      Authorization: `Bearer ${LOCAL_ANON_KEY}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch local products: ${res.status}`);
  }
  return res.json();
}

async function copyProducts(client, products) {
  console.log(`\nFound ${products.length} products locally.`);

  // Check which slugs already exist in production
  const { rows: existing } = await client.query(
    "SELECT slug FROM public.products"
  );
  const existingSlugs = new Set(existing.map((r) => r.slug));
  const newProducts = products.filter((p) => !existingSlugs.has(p.slug));

  if (newProducts.length === 0) {
    console.log("All products already exist in production. Skipping.");
    return;
  }

  console.log(`Inserting ${newProducts.length} new products...`);

  for (const p of newProducts) {
    const cols = Object.keys(p).filter(
      (k) => k !== "id" && k !== "created_at" && k !== "updated_at"
    );
    const vals = cols.map((c) => p[c]);
    const placeholders = cols.map((_, i) => `$${i + 1}`).join(", ");
    const colNames = cols.map((c) => `"${c}"`).join(", ");

    await client.query(
      `INSERT INTO public.products (${colNames}) VALUES (${placeholders}) ON CONFLICT (slug) DO NOTHING`,
      vals
    );
    console.log(`  + ${p.name}`);
  }
  console.log("Done inserting products.");
}

async function verify(client) {
  const { rows } = await client.query(
    "SELECT name, is_featured, is_active FROM public.products WHERE is_active = true ORDER BY created_at DESC"
  );
  console.log(`\nProduction now has ${rows.length} active products:`);
  rows.forEach((p) =>
    console.log(`  - ${p.name} ${p.is_featured ? "(featured)" : ""}`)
  );
}

async function main() {
  const client = new Client({
    connectionString: PROD_DB_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log("Connected to production database.");

    await runMigrations(client);

    const products = await fetchLocalProducts();
    await copyProducts(client, products);

    await verify(client);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
