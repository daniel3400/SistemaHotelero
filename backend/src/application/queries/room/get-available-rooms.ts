import { RoomRepository } from "../../../domain/repositories/room-repository.js";

export class GetAvailableRooms {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute() {
    const rooms = await this.roomRepository.list("AVAILABLE");
    return rooms.map((room) => room.info);
  }
}
