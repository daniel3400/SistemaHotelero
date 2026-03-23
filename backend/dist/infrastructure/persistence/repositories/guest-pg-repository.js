import { Guest } from "../../../domain/entities/guest/guest.js";
export class GuestPgRepository {
    pool;
    constructor(pool) {
        this.pool = pool;
    }
    async create(guest) {
        const info = guest.info;
        await this.pool.query("INSERT INTO guests (id, full_name, document_number, phone, created_at) VALUES ($1,$2,$3,$4,$5)", [info.id, info.fullName, info.documentNumber, info.phone, info.createdAt]);
    }
    async update(guest) {
        const info = guest.info;
        await this.pool.query("UPDATE guests SET full_name = $1, document_number = $2, phone = $3 WHERE id = $4", [info.fullName, info.documentNumber, info.phone, info.id]);
    }
    async getById(id) {
        const result = await this.pool.query("SELECT id, full_name, document_number, phone, created_at FROM guests WHERE id = $1", [id]);
        if (result.rowCount === 0)
            return null;
        const row = result.rows[0];
        return new Guest(row.id, row.full_name, row.document_number, row.phone, row.created_at);
    }
    async list() {
        const result = await this.pool.query("SELECT id, full_name, document_number, phone, created_at FROM guests ORDER BY full_name");
        return result.rows.map((row) => new Guest(row.id, row.full_name, row.document_number, row.phone, row.created_at));
    }
}
