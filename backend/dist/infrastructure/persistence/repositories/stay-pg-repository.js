import { Stay } from "../../../domain/entities/stay/stay.js";
export class StayPgRepository {
    pool;
    constructor(pool) {
        this.pool = pool;
    }
    async create(stay) {
        const info = stay.info;
        await this.pool.query("INSERT INTO stays (id, room_id, guest_id, check_in_date, expected_check_out_date, actual_check_out_date, number_of_guests, price_per_night, discount, total_amount, status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)", [
            info.id,
            info.roomId,
            info.guestId,
            info.checkInDate,
            info.expectedCheckOutDate,
            info.actualCheckOutDate,
            info.numberOfGuests,
            info.pricePerNight,
            info.discount,
            info.totalAmount,
            info.status
        ]);
    }
    async update(stay) {
        const info = stay.info;
        await this.pool.query("UPDATE stays SET check_in_date = $1, expected_check_out_date = $2, actual_check_out_date = $3, number_of_guests = $4, price_per_night = $5, discount = $6, total_amount = $7, status = $8 WHERE id = $9", [
            info.checkInDate,
            info.expectedCheckOutDate,
            info.actualCheckOutDate,
            info.numberOfGuests,
            info.pricePerNight,
            info.discount,
            info.totalAmount,
            info.status,
            info.id
        ]);
    }
    async getById(id) {
        const result = await this.pool.query("SELECT id, room_id, guest_id, check_in_date, expected_check_out_date, actual_check_out_date, number_of_guests, price_per_night, discount, total_amount, status FROM stays WHERE id = $1", [id]);
        if (result.rowCount === 0)
            return null;
        const row = result.rows[0];
        return new Stay(row.id, row.room_id, row.guest_id, row.check_in_date, row.expected_check_out_date, row.actual_check_out_date, row.number_of_guests, row.price_per_night, row.discount, row.total_amount, row.status);
    }
    async list(status) {
        const result = await this.pool.query(status
            ? "SELECT id, room_id, guest_id, check_in_date, expected_check_out_date, actual_check_out_date, number_of_guests, price_per_night, discount, total_amount, status FROM stays WHERE status = $1 ORDER BY check_in_date DESC"
            : "SELECT id, room_id, guest_id, check_in_date, expected_check_out_date, actual_check_out_date, number_of_guests, price_per_night, discount, total_amount, status FROM stays ORDER BY check_in_date DESC", status ? [status] : []);
        const rows = result.rows;
        return rows.map((row) => new Stay(row.id, row.room_id, row.guest_id, row.check_in_date, row.expected_check_out_date, row.actual_check_out_date, row.number_of_guests, row.price_per_night, row.discount, row.total_amount, row.status));
    }
}
