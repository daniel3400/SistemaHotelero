import { NotFoundError } from "../../../shared/errors/not-found-error.js";
export class CancelDailyCleaning {
    roomRepository;
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }
    async execute(id) {
        const room = await this.roomRepository.getById(id);
        if (!room)
            throw new NotFoundError("Habitacion no encontrada.");
        room.cancelDailyCleaning();
        await this.roomRepository.update(room);
        return room.info;
    }
}
