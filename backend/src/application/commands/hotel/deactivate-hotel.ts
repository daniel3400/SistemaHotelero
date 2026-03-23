import { HotelRepository } from "../../../domain/repositories/hotel-repository.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";

export class DeactivateHotel {
  constructor(private readonly hotelRepository: HotelRepository) {}

  async execute(id: string) {
    const hotel = await this.hotelRepository.getById(id);
    if (!hotel) throw new NotFoundError("Hotel no encontrado.");

    hotel.deactivate();
    await this.hotelRepository.update(hotel);
    return hotel.info;
  }
}
