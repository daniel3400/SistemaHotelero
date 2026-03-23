import pg from "pg";
export const createPool = () => {
    const pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL
    });
    return pool;
};
