import { GuestRepository } from "../../../domain/repositories/guest-repository.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { ValidationError } from "../../../shared/errors/validation-error.js";

interface UpdateGuestInfoInput {
  id: string;
  fullName: string;
  documentNumber: string;
  phone: string;
}

export class UpdateGuestInfo {
  constructor(private readonly guestRepository: GuestRepository) {}

  async execute(input: UpdateGuestInfoInput) {
    const guest = await this.guestRepository.getById(input.id);
    if (!guest) throw new NotFoundError("Huesped no encontrado.");

    if (!input.fullName.trim() || !input.documentNumber.trim() || !input.phone.trim()) {
      throw new ValidationError("Todos los campos del huesped son obligatorios.");
    }

    if (input.fullName.trim().length < 3) {
      throw new ValidationError("El nombre completo debe tener al menos 3 caracteres.");
    }

    if (!/^[a-zA-Z0-9-]{5,25}$/.test(input.documentNumber.trim())) {
      throw new ValidationError("El numero de documento no tiene un formato valido.");
    }

    if (!/^[0-9+()\-\s]{7,20}$/.test(input.phone.trim())) {
      throw new ValidationError("El telefono no tiene un formato valido.");
    }

    guest.updateInfo(input.fullName.trim(), input.documentNumber.trim(), input.phone.trim());
    await this.guestRepository.update(guest);
    return guest.info;
  }
}
