import { GuestRepository } from "../../../domain/repositories/guest-repository.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";

export class GetGuestDetails {
  constructor(private readonly guestRepository: GuestRepository) {}

  async execute(id: string) {
    const guest = await this.guestRepository.getById(id);
    if (!guest) throw new NotFoundError("Huesped no encontrado.");
    return guest.info;
  }
}
