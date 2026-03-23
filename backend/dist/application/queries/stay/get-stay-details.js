import { NotFoundError } from "../../../shared/errors/not-found-error.js";
export class GetStayDetails {
    stayRepository;
    constructor(stayRepository) {
        this.stayRepository = stayRepository;
    }
    async execute(id) {
        const stay = await this.stayRepository.getById(id);
        if (!stay)
            throw new NotFoundError("Estancia no encontrada.");
        return stay.info;
    }
}
