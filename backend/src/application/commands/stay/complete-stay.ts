import { RoomRepository } from "../../../domain/repositories/room-repository.js";
import { StayRepository } from "../../../domain/repositories/stay-repository.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { ValidationError } from "../../../shared/errors/validation-error.js";

export class CompleteStay {
  constructor(
    private readonly stayRepository: StayRepository,
    private readonly roomRepository: RoomRepository
  ) {}

  async execute(id: string, actualCheckOutDate: Date) {
    if (Number.isNaN(actualCheckOutDate.getTime())) {
      throw new ValidationError("La fecha real de salida no es valida.");
    }

    const stay = await this.stayRepository.getById(id);
    if (!stay) throw new NotFoundError("Estancia no encontrada.");

    if (actualCheckOutDate < stay.info.checkInDate) {
      throw new ValidationError("La fecha real de salida no puede ser anterior al check-in.");
    }

    const room = await this.roomRepository.getById(stay.info.roomId);
    if (!room) throw new NotFoundError("Habitacion no encontrada.");

    stay.completeStay(actualCheckOutDate);
    await this.stayRepository.update(stay);

    room.checkout();
    await this.roomRepository.update(room);

    return stay.info;
  }
}
