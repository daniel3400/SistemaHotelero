import { Hotel } from "../entities/hotel/hotel.js";

export interface HotelRepository {
  getById(id: string): Promise<Hotel | null>;
  list(): Promise<Hotel[]>;
  update(hotel: Hotel): Promise<void>;
  create(hotel: Hotel): Promise<void>;
}
