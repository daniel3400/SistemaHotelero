import { RoomRepository } from "../../../domain/repositories/room-repository.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";

export class MarkRoomAsClean {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(id: string) {
    const room = await this.roomRepository.getById(id);
    if (!room) throw new NotFoundError("Habitacion no encontrada.");

    room.markAsClean();
    await this.roomRepository.update(room);
    return room.info;
  }
}
