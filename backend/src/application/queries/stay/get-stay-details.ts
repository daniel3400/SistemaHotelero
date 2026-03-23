import { StayRepository } from "../../../domain/repositories/stay-repository.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";

export class GetStayDetails {
  constructor(private readonly stayRepository: StayRepository) {}

  async execute(id: string) {
    const stay = await this.stayRepository.getById(id);
    if (!stay) throw new NotFoundError("Estancia no encontrada.");
    return stay.info;
  }
}
