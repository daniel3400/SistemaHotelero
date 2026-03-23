import { Hotel } from "../../../domain/entities/hotel/hotel.js";
import { HotelRepository } from "../../../domain/repositories/hotel-repository.js";
import { ValidationError } from "../../../shared/errors/validation-error.js";
import { generateId } from "../../../shared/utils/id.js";

interface CreateHotelInput {
  name: string;
  address: string;
  phone: string;
}

export class CreateHotel {
  constructor(private readonly hotelRepository: HotelRepository) {}

  async execute(input: CreateHotelInput) {
    if (!input.name.trim() || !input.address.trim() || !input.phone.trim()) {
      throw new ValidationError("Todos los campos del hotel son obligatorios.");
    }

    if (input.name.trim().length < 2) {
      throw new ValidationError("El nombre del hotel debe tener al menos 2 caracteres.");
    }

    if (!/^[0-9+()\-\s]{7,20}$/.test(input.phone.trim())) {
      throw new ValidationError("El telefono del hotel no tiene un formato valido.");
    }

    const hotel = new Hotel(
      generateId(),
      input.name.trim(),
      input.address.trim(),
      input.phone.trim(),
      "ACTIVE",
      new Date()
    );

    await this.hotelRepository.create(hotel);
    return hotel.info;
  }
}
