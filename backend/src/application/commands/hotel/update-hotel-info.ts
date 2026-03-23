import { HotelRepository } from "../../../domain/repositories/hotel-repository.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { ValidationError } from "../../../shared/errors/validation-error.js";

interface UpdateHotelInfoInput {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export class UpdateHotelInfo {
  constructor(private readonly hotelRepository: HotelRepository) {}

  async execute(input: UpdateHotelInfoInput) {
    const hotel = await this.hotelRepository.getById(input.id);
    if (!hotel) throw new NotFoundError("Hotel no encontrado.");

    if (!input.name.trim() || !input.address.trim() || !input.phone.trim()) {
      throw new ValidationError("Todos los campos del hotel son obligatorios.");
    }

    if (input.name.trim().length < 2) {
      throw new ValidationError("El nombre del hotel debe tener al menos 2 caracteres.");
    }

    if (!/^[0-9+()\-\s]{7,20}$/.test(input.phone.trim())) {
      throw new ValidationError("El telefono del hotel no tiene un formato valido.");
    }

    hotel.updateInfo(input.name.trim(), input.address.trim(), input.phone.trim());
    await this.hotelRepository.update(hotel);

    return hotel.info;
  }
}
