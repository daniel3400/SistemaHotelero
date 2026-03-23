import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import pg from "pg";

const run = async () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL no configurado en .env");
  }

  const schemaPath = path.resolve(process.cwd(), "supabase", "schema.sql");
  const sql = await fs.readFile(schemaPath, "utf8");

  const sslEnabled =
    process.env.DB_SSL === "true" ||
    process.env.DB_SSL === "1" ||
    connectionString.includes("supabase.co");

  const pool = new pg.Pool({
    connectionString,
    ssl: sslEnabled
      ? {
          rejectUnauthorized: false
        }
      : undefined
  });

  try {
    await pool.query(sql);
    console.log("Schema de Supabase aplicado correctamente.");
  } finally {
    await pool.end();
  }
};

run().catch((error) => {
  console.error("No se pudo aplicar el schema en Supabase:", error);
  process.exit(1);
});
