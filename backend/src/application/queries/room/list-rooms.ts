import { RoomRepository } from "../../../domain/repositories/room-repository.js";
import { RoomStatus } from "../../../domain/value-objects/statuses.js";

export class ListRooms {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(status?: RoomStatus) {
    const rooms = await this.roomRepository.list(status);
    return rooms.map((room) => room.info);
  }
}
