import { GuestRepository } from "../../../domain/repositories/guest-repository.js";

export class ListGuests {
  constructor(private readonly guestRepository: GuestRepository) {}

  async execute() {
    const guests = await this.guestRepository.list();
    return guests.map((guest) => guest.info);
  }
}
