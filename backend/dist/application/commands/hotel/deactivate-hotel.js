import { NotFoundError } from "../../../shared/errors/not-found-error.js";
export class DeactivateHotel {
    hotelRepository;
    constructor(hotelRepository) {
        this.hotelRepository = hotelRepository;
    }
    async execute(id) {
        const hotel = await this.hotelRepository.getById(id);
        if (!hotel)
            throw new NotFoundError("Hotel no encontrado.");
        hotel.deactivate();
        await this.hotelRepository.update(hotel);
        return hotel.info;
    }
}
