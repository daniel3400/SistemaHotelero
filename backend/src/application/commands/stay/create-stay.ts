import { Stay } from "../../../domain/entities/stay/stay.js";
import { GuestRepository } from "../../../domain/repositories/guest-repository.js";
import { RoomRepository } from "../../../domain/repositories/room-repository.js";
import { StayRepository } from "../../../domain/repositories/stay-repository.js";
import { ValidationError } from "../../../shared/errors/validation-error.js";
import { generateId } from "../../../shared/utils/id.js";

interface CreateStayInput {
  roomId: string;
  guestId: string;
  checkInDate: Date;
  expectedCheckOutDate: Date;
  numberOfGuests: number;
  pricePerNight?: number;
  discount?: number | null;
}

export class CreateStay {
  constructor(
    private readonly stayRepository: StayRepository,
    private readonly roomRepository: RoomRepository,
    private readonly guestRepository: GuestRepository
  ) {}

  async execute(input: CreateStayInput) {
    if (Number.isNaN(input.checkInDate.getTime()) || Number.isNaN(input.expectedCheckOutDate.getTime())) {
      throw new ValidationError("Las fechas de la estancia no son validas.");
    }

    if (input.expectedCheckOutDate <= input.checkInDate) {
      throw new ValidationError("La fecha de salida debe ser posterior a la fecha de ingreso.");
    }

    if (input.numberOfGuests <= 0) {
      throw new ValidationError("El numero de huespedes debe ser mayor a cero.");
    }

    const room = await this.roomRepository.getById(input.roomId);
    if (!room) throw new ValidationError("La habitacion no existe.");

    const guest = await this.guestRepository.getById(input.guestId);
    if (!guest) throw new ValidationError("El huesped no existe.");

    if (input.numberOfGuests > room.info.maxGuests) {
      throw new ValidationError("El numero de huespedes excede la capacidad de la habitacion.");
    }

    if (input.pricePerNight !== undefined && input.pricePerNight <= 0) {
      throw new ValidationError("El precio por noche debe ser mayor a cero.");
    }

    if (input.discount !== undefined && input.discount !== null && (input.discount < 0 || input.discount > 100)) {
      throw new ValidationError("El descuento debe estar entre 0 y 100.");
    }

    const pricePerNight =
      input.pricePerNight ?? (input.numberOfGuests === 1 ? 60000 : 80000);

    const stay = new Stay(
      generateId(),
      input.roomId,
      input.guestId,
      input.checkInDate,
      input.expectedCheckOutDate,
      null,
      input.numberOfGuests,
      pricePerNight,
      input.discount ?? null,
      0,
      "ACTIVE"
    );

    stay.calculateTotal();
    await this.stayRepository.create(stay);
    room.occupy();
    await this.roomRepository.update(room);

    return stay.info;
  }
}
