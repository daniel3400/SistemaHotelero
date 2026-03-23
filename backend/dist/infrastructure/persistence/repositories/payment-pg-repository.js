import { Payment } from "../../../domain/entities/payment/payment.js";
export class PaymentPgRepository {
    pool;
    constructor(pool) {
        this.pool = pool;
    }
    async create(payment) {
        const info = payment.info;
        await this.pool.query("INSERT INTO payments (id, stay_id, amount, method, status, created_at) VALUES ($1,$2,$3,$4,$5,$6)", [info.id, info.stayId, info.amount, info.method, info.status, info.createdAt]);
    }
    async update(payment) {
        const info = payment.info;
        await this.pool.query("UPDATE payments SET amount = $1, method = $2, status = $3 WHERE id = $4", [info.amount, info.method, info.status, info.id]);
    }
    async getById(id) {
        const result = await this.pool.query("SELECT id, stay_id, amount, method, status, created_at FROM payments WHERE id = $1", [id]);
        if (result.rowCount === 0)
            return null;
        const row = result.rows[0];
        return new Payment(row.id, row.stay_id, row.amount, row.method, row.status, row.created_at);
    }
    async listByStay(stayId) {
        const result = await this.pool.query("SELECT id, stay_id, amount, method, status, created_at FROM payments WHERE stay_id = $1 ORDER BY created_at DESC", [stayId]);
        const rows = result.rows;
        return rows.map((row) => new Payment(row.id, row.stay_id, row.amount, row.method, row.status, row.created_at));
    }
    async listAll() {
        const result = await this.pool.query("SELECT id, stay_id, amount, method, status, created_at FROM payments ORDER BY created_at DESC");
        const rows = result.rows;
        return rows.map((row) => new Payment(row.id, row.stay_id, row.amount, row.method, row.status, row.created_at));
    }
}
