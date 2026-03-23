import { RoomRepository } from "../../../domain/repositories/room-repository.js";

export class GetOccupiedRooms {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute() {
    const rooms = await this.roomRepository.list("OCCUPIED");
    return rooms.map((room) => room.info);
  }
}
