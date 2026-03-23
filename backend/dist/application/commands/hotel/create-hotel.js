import { Hotel } from "../../../domain/entities/hotel/hotel.js";
import { ValidationError } from "../../../shared/errors/validation-error.js";
import { generateId } from "../../../shared/utils/id.js";
export class CreateHotel {
    hotelRepository;
    constructor(hotelRepository) {
        this.hotelRepository = hotelRepository;
    }
    async execute(input) {
        if (!input.name.trim() || !input.address.trim() || !input.phone.trim()) {
            throw new ValidationError("Todos los campos del hotel son obligatorios.");
        }
        if (input.name.trim().length < 2) {
            throw new ValidationError("El nombre del hotel debe tener al menos 2 caracteres.");
        }
        if (!/^[0-9+()\-\s]{7,20}$/.test(input.phone.trim())) {
            throw new ValidationError("El telefono del hotel no tiene un formato valido.");
        }
        const hotel = new Hotel(generateId(), input.name.trim(), input.address.trim(), input.phone.trim(), "ACTIVE", new Date());
        await this.hotelRepository.create(hotel);
        return hotel.info;
    }
}
