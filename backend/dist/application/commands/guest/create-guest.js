import { Guest } from "../../../domain/entities/guest/guest.js";
import { ValidationError } from "../../../shared/errors/validation-error.js";
import { generateId } from "../../../shared/utils/id.js";
export class CreateGuest {
    guestRepository;
    constructor(guestRepository) {
        this.guestRepository = guestRepository;
    }
    async execute(input) {
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
        const guest = new Guest(generateId(), input.fullName.trim(), input.documentNumber.trim(), input.phone.trim(), new Date());
        await this.guestRepository.create(guest);
        return guest.info;
    }
}
