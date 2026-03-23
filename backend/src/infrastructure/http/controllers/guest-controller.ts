import { Request, Response } from "express";
import { z } from "zod";
import { CreateGuest } from "../../../application/commands/guest/create-guest.js";
import { UpdateGuestInfo } from "../../../application/commands/guest/update-guest-info.js";
import { GetGuestDetails } from "../../../application/queries/guest/get-guest-details.js";
import { ListGuests } from "../../../application/queries/guest/list-guests.js";
import {
  documentNumberSchema,
  fullNameSchema,
  phoneSchema,
  uuidSchema
} from "../utils/validation-schemas.js";

const guestPayloadSchema = z.object({
  fullName: fullNameSchema,
  documentNumber: documentNumberSchema,
  phone: phoneSchema
});

const guestParamsSchema = z.object({
  id: uuidSchema
});

export class GuestController {
  constructor(
    private readonly createGuest: CreateGuest,
    private readonly updateGuestInfo: UpdateGuestInfo,
    private readonly listGuests: ListGuests,
    private readonly getGuestDetails: GetGuestDetails
  ) {}

  list = async (_req: Request, res: Response) => {
    res.json(await this.listGuests.execute());
  };

  getById = async (req: Request, res: Response) => {
    const { id } = guestParamsSchema.parse(req.params);
    res.json(await this.getGuestDetails.execute(id));
  };

  create = async (req: Request, res: Response) => {
    const payload = guestPayloadSchema.parse(req.body);
    const guest = await this.createGuest.execute(payload);
    res.status(201).json(guest);
  };

  update = async (req: Request, res: Response) => {
    const { id } = guestParamsSchema.parse(req.params);
    const payload = guestPayloadSchema.parse(req.body);
    const guest = await this.updateGuestInfo.execute({ id, ...payload });
    res.json(guest);
  };
}
