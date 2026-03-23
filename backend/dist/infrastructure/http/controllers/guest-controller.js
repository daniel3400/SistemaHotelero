import { z } from "zod";
import { documentNumberSchema, fullNameSchema, phoneSchema, uuidSchema } from "../utils/validation-schemas.js";
const guestPayloadSchema = z.object({
    fullName: fullNameSchema,
    documentNumber: documentNumberSchema,
    phone: phoneSchema
});
const guestParamsSchema = z.object({
    id: uuidSchema
});
export class GuestController {
    createGuest;
    updateGuestInfo;
    listGuests;
    getGuestDetails;
    constructor(createGuest, updateGuestInfo, listGuests, getGuestDetails) {
        this.createGuest = createGuest;
        this.updateGuestInfo = updateGuestInfo;
        this.listGuests = listGuests;
        this.getGuestDetails = getGuestDetails;
    }
    list = async (_req, res) => {
        res.json(await this.listGuests.execute());
    };
    getById = async (req, res) => {
        const { id } = guestParamsSchema.parse(req.params);
        res.json(await this.getGuestDetails.execute(id));
    };
    create = async (req, res) => {
        const payload = guestPayloadSchema.parse(req.body);
        const guest = await this.createGuest.execute(payload);
        res.status(201).json(guest);
    };
    update = async (req, res) => {
        const { id } = guestParamsSchema.parse(req.params);
        const payload = guestPayloadSchema.parse(req.body);
        const guest = await this.updateGuestInfo.execute({ id, ...payload });
        res.json(guest);
    };
}
