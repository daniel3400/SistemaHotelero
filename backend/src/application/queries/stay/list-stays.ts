import { StayRepository } from "../../../domain/repositories/stay-repository.js";
import { StayStatus } from "../../../domain/value-objects/statuses.js";

export class ListStays {
  constructor(private readonly stayRepository: StayRepository) {}

  async execute(status?: StayStatus) {
    const stays = await this.stayRepository.list(status);
    return stays.map((stay) => stay.info);
  }
}
