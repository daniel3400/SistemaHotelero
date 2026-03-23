import { NotFoundError } from "../../../shared/errors/not-found-error.js";
export class GetGuestDetails {
    guestRepository;
    constructor(guestRepository) {
        this.guestRepository = guestRepository;
    }
    async execute(id) {
        const guest = await this.guestRepository.getById(id);
        if (!guest)
            throw new NotFoundError("Huesped no encontrado.");
        return guest.info;
    }
}
