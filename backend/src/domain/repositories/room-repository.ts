import { Room } from "../entities/room/room.js";
import { RoomStatus } from "../value-objects/statuses.js";

export interface RoomRepository {
  create(room: Room): Promise<void>;
  update(room: Room): Promise<void>;
  getById(id: string): Promise<Room | null>;
  list(status?: RoomStatus): Promise<Room[]>;
}
