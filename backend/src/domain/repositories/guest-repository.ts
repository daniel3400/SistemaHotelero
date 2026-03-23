import { Guest } from "../entities/guest/guest.js";

export interface GuestRepository {
  create(guest: Guest): Promise<void>;
  update(guest: Guest): Promise<void>;
  getById(id: string): Promise<Guest | null>;
  list(): Promise<Guest[]>;
}
