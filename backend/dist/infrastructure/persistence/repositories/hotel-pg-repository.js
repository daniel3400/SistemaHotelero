import { Hotel } from "../../../domain/entities/hotel/hotel.js";
export class HotelPgRepository {
    pool;
    constructor(pool) {
        this.pool = pool;
    }
    async list() {
        const result = await this.pool.query("SELECT id, name, address, phone, status, created_at FROM hotels ORDER BY name");
        return result.rows.map((row) => new Hotel(row.id, row.name, row.address, row.phone, row.status, row.created_at));
    }
    async getById(id) {
        const result = await this.pool.query("SELECT id, name, address, phone, status, created_at FROM hotels WHERE id = $1", [id]);
        if (result.rowCount === 0)
            return null;
        const row = result.rows[0];
        return new Hotel(row.id, row.name, row.address, row.phone, row.status, row.created_at);
    }
    async update(hotel) {
        const info = hotel.info;
        await this.pool.query("UPDATE hotels SET name = $1, address = $2, phone = $3, status = $4 WHERE id = $5", [info.name, info.address, info.phone, info.status, info.id]);
    }
    async create(hotel) {
        const info = hotel.info;
        await this.pool.query("INSERT INTO hotels (id, name, address, phone, status, created_at) VALUES ($1, $2, $3, $4, $5, $6)", [info.id, info.name, info.address, info.phone, info.status, info.createdAt]);
    }
}
