import { HotelRepository } from "../../../domain/repositories/hotel-repository.js";

export class ListHotels {
  constructor(private readonly hotelRepository: HotelRepository) {}

  async execute() {
    const hotels = await this.hotelRepository.list();
    return hotels.map((hotel) => hotel.info);
  }
}
