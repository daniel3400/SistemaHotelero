import { Room } from "../../../domain/entities/room/room.js";
import { ValidationError } from "../../../shared/errors/validation-error.js";
import { generateId } from "../../../shared/utils/id.js";
export class CreateRoom {
    roomRepository;
    hotelRepository;
    constructor(roomRepository, hotelRepository) {
        this.roomRepository = roomRepository;
        this.hotelRepository = hotelRepository;
    }
    async execute(input) {
        if (!input.hotelId.trim()) {
            throw new ValidationError("El hotel es obligatorio.");
        }
        if (!/^[a-zA-Z0-9-]+$/.test(input.roomNumber.trim())) {
            throw new ValidationError("El numero de habitacion contiene caracteres no validos.");
        }
        if (!input.roomNumber.trim()) {
            throw new ValidationError("El numero de habitacion es obligatorio.");
        }
        if (input.beds.length === 0) {
            throw new ValidationError("Debe definir al menos un tipo de cama.");
        }
        const totalBeds = input.beds.reduce((total, bed) => total + bed.quantity, 0);
        if (totalBeds > input.maxGuests) {
            throw new ValidationError("El maximo de huespedes no puede ser menor que la cantidad total de camas.");
        }
        if (input.maxGuests <= 0) {
            throw new ValidationError("El maximo de huespedes debe ser mayor a cero.");
        }
        const hotel = await this.hotelRepository.getById(input.hotelId.trim());
        if (!hotel) {
            throw new ValidationError("El hotel no existe.");
        }
        const room = new Room(generateId(), input.hotelId.trim(), input.roomNumber.trim(), input.beds, input.maxGuests, input.hasDecoder, "AVAILABLE", false, false, new Date());
        await this.roomRepository.create(room);
        return room.info;
    }
}
