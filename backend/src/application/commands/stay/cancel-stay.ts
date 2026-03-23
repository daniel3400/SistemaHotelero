import { RoomRepository } from "../../../domain/repositories/room-repository.js";
import { StayRepository } from "../../../domain/repositories/stay-repository.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";

export class CancelStay {
  constructor(
    private readonly stayRepository: StayRepository,
    private readonly roomRepository: RoomRepository
  ) {}

  async execute(id: string) {
    const stay = await this.stayRepository.getById(id);
    if (!stay) throw new NotFoundError("Estancia no encontrada.");

    const room = await this.roomRepository.getById(stay.info.roomId);
    if (!room) throw new NotFoundError("Habitacion no encontrada.");

    stay.cancelStay();
    await this.stayRepository.update(stay);

    room.checkout();
    await this.roomRepository.update(room);

    return stay.info;
  }
}
