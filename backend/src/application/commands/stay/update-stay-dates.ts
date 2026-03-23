import { StayRepository } from "../../../domain/repositories/stay-repository.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { ValidationError } from "../../../shared/errors/validation-error.js";

interface UpdateStayDatesInput {
  id: string;
  checkInDate: Date;
  expectedCheckOutDate: Date;
}

export class UpdateStayDates {
  constructor(private readonly stayRepository: StayRepository) {}

  async execute(input: UpdateStayDatesInput) {
    if (Number.isNaN(input.checkInDate.getTime()) || Number.isNaN(input.expectedCheckOutDate.getTime())) {
      throw new ValidationError("Las fechas de la estancia no son validas.");
    }

    if (input.expectedCheckOutDate <= input.checkInDate) {
      throw new ValidationError("La fecha de salida debe ser posterior a la fecha de ingreso.");
    }

    const stay = await this.stayRepository.getById(input.id);
    if (!stay) throw new NotFoundError("Estancia no encontrada.");

    stay.updateDates(input.checkInDate, input.expectedCheckOutDate);
    await this.stayRepository.update(stay);
    return stay.info;
  }
}
