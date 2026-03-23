import { RoomRepository } from "../../../domain/repositories/room-repository.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";

export class CancelDailyCleaning {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(id: string) {
    const room = await this.roomRepository.getById(id);
    if (!room) throw new NotFoundError("Habitacion no encontrada.");

    room.cancelDailyCleaning();
    await this.roomRepository.update(room);
    return room.info;
  }
}
