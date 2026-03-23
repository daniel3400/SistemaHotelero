import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { ValidationError } from "../../../shared/errors/validation-error.js";
export class UpdateRoomInfo {
    roomRepository;
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }
    async execute(input) {
        const room = await this.roomRepository.getById(input.id);
        if (!room)
            throw new NotFoundError("Habitacion no encontrada.");
        if (input.beds.length === 0) {
            throw new ValidationError("Debe definir al menos un tipo de cama.");
        }
        if (input.maxGuests <= 0) {
            throw new ValidationError("El maximo de huespedes debe ser mayor a cero.");
        }
        const totalBeds = input.beds.reduce((total, bed) => total + bed.quantity, 0);
        if (totalBeds > input.maxGuests) {
            throw new ValidationError("El maximo de huespedes no puede ser menor que la cantidad total de camas.");
        }
        room.updateInfo(input.beds, input.maxGuests, input.hasDecoder);
        await this.roomRepository.update(room);
        return room.info;
    }
}
