import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { ValidationError } from "../../../shared/errors/validation-error.js";
export class UpdateStayDates {
    stayRepository;
    constructor(stayRepository) {
        this.stayRepository = stayRepository;
    }
    async execute(input) {
        if (Number.isNaN(input.checkInDate.getTime()) || Number.isNaN(input.expectedCheckOutDate.getTime())) {
            throw new ValidationError("Las fechas de la estancia no son validas.");
        }
        if (input.expectedCheckOutDate <= input.checkInDate) {
            throw new ValidationError("La fecha de salida debe ser posterior a la fecha de ingreso.");
        }
        const stay = await this.stayRepository.getById(input.id);
        if (!stay)
            throw new NotFoundError("Estancia no encontrada.");
        stay.updateDates(input.checkInDate, input.expectedCheckOutDate);
        await this.stayRepository.update(stay);
        return stay.info;
    }
}
