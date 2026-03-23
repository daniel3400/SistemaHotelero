import { Pool } from "pg";
import { Hotel } from "../../../domain/entities/hotel/hotel.js";
import { HotelRepository } from "../../../domain/repositories/hotel-repository.js";

export class HotelPgRepository implements HotelRepository {
  constructor(private readonly pool: Pool) {}

  async list(): Promise<Hotel[]> {
    const result = await this.pool.query(
      "SELECT id, name, address, phone, status, created_at FROM hotels ORDER BY name"
    );

    return result.rows.map(
      (row) => new Hotel(row.id, row.name, row.address, row.phone, row.status, row.created_at)
    );
  }

  async getById(id: string): Promise<Hotel | null> {
    const result = await this.pool.query(
      "SELECT id, name, address, phone, status, created_at FROM hotels WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) return null;

    const row = result.rows[0];
    return new Hotel(row.id, row.name, row.address, row.phone, row.status, row.created_at);
  }

  async update(hotel: Hotel): Promise<void> {
    const info = hotel.info;
    await this.pool.query(
      "UPDATE hotels SET name = $1, address = $2, phone = $3, status = $4 WHERE id = $5",
      [info.name, info.address, info.phone, info.status, info.id]
    );
  }

  async create(hotel: Hotel): Promise<void> {
    const info = hotel.info;
    await this.pool.query(
      "INSERT INTO hotels (id, name, address, phone, status, created_at) VALUES ($1, $2, $3, $4, $5, $6)",
      [info.id, info.name, info.address, info.phone, info.status, info.createdAt]
    );
  }
}
