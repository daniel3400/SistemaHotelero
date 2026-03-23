import { RoomRepository } from "../../../domain/repositories/room-repository.js";

export class GetRoomsPendingCleaning {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute() {
    const rooms = await this.roomRepository.list("CLEANING_PENDING");
    return rooms.map((room) => room.info);
  }
}
