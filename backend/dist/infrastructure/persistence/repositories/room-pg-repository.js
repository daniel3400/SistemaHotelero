import { Room } from "../../../domain/entities/room/room.js";
export class RoomPgRepository {
    pool;
    constructor(pool) {
        this.pool = pool;
    }
    async create(room) {
        const info = room.info;
        await this.pool.query("INSERT INTO rooms (id, hotel_id, room_number, beds, max_guests, has_decoder, status, daily_cleaning_requested, requires_cleaning, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)", [
            info.id,
            info.hotelId,
            info.roomNumber,
            JSON.stringify(info.beds),
            info.maxGuests,
            info.hasDecoder,
            info.status,
            info.dailyCleaningRequested,
            info.requiresCleaning,
            info.createdAt
        ]);
    }
    async update(room) {
        const info = room.info;
        await this.pool.query("UPDATE rooms SET beds = $1, max_guests = $2, has_decoder = $3, status = $4, daily_cleaning_requested = $5, requires_cleaning = $6 WHERE id = $7", [
            JSON.stringify(info.beds),
            info.maxGuests,
            info.hasDecoder,
            info.status,
            info.dailyCleaningRequested,
            info.requiresCleaning,
            info.id
        ]);
    }
    async getById(id) {
        const result = await this.pool.query("SELECT id, hotel_id, room_number, beds, max_guests, has_decoder, status, daily_cleaning_requested, requires_cleaning, created_at FROM rooms WHERE id = $1", [id]);
        if (result.rowCount === 0)
            return null;
        const row = result.rows[0];
        return new Room(row.id, row.hotel_id, row.room_number, row.beds, row.max_guests, row.has_decoder, row.status, row.daily_cleaning_requested, row.requires_cleaning, row.created_at);
    }
    async list(status) {
        const result = await this.pool.query(status
            ? "SELECT id, hotel_id, room_number, beds, max_guests, has_decoder, status, daily_cleaning_requested, requires_cleaning, created_at FROM rooms WHERE status = $1 ORDER BY room_number"
            : "SELECT id, hotel_id, room_number, beds, max_guests, has_decoder, status, daily_cleaning_requested, requires_cleaning, created_at FROM rooms ORDER BY room_number", status ? [status] : []);
        const rows = result.rows;
        return rows.map((row) => new Room(row.id, row.hotel_id, row.room_number, row.beds, row.max_guests, row.has_decoder, row.status, row.daily_cleaning_requested, row.requires_cleaning, row.created_at));
    }
}
