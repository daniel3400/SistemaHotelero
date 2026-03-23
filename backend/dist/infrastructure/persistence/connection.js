import pg from "pg";
export const createPool = () => {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        throw new Error("DATABASE_URL no configurado.");
    }
    const sslEnabled = process.env.DB_SSL === "true" ||
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
    return pool;
};
