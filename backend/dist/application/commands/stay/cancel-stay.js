import { NotFoundError } from "../../../shared/errors/not-found-error.js";
export class CancelStay {
    stayRepository;
    roomRepository;
    constructor(stayRepository, roomRepository) {
        this.stayRepository = stayRepository;
        this.roomRepository = roomRepository;
    }
    async execute(id) {
        const stay = await this.stayRepository.getById(id);
        if (!stay)
            throw new NotFoundError("Estancia no encontrada.");
        const room = await this.roomRepository.getById(stay.info.roomId);
        if (!room)
            throw new NotFoundError("Habitacion no encontrada.");
        stay.cancelStay();
        await this.stayRepository.update(stay);
        room.checkout();
        await this.roomRepository.update(room);
        return stay.info;
    }
}
