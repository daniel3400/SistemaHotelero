import { StayRepository } from "../../../domain/repositories/stay-repository.js";

export class GetActiveStays {
  constructor(private readonly stayRepository: StayRepository) {}

  async execute() {
    const stays = await this.stayRepository.list("ACTIVE");
    return stays.map((stay) => stay.info);
  }
}
