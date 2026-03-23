import { Request, Response } from "express";
import { z } from "zod";
import { CreateStay } from "../../../application/commands/stay/create-stay.js";
import { UpdateStayDates } from "../../../application/commands/stay/update-stay-dates.js";
import { CompleteStay } from "../../../application/commands/stay/complete-stay.js";
import { CancelStay } from "../../../application/commands/stay/cancel-stay.js";
import { GetActiveStays } from "../../../application/queries/stay/get-active-stays.js";
import { GetStayDetails } from "../../../application/queries/stay/get-stay-details.js";
import { ListStays } from "../../../application/queries/stay/list-stays.js";
import {
  isoDateToDateSchema,
  percentageSchema,
  positiveMoneySchema,
  stayStatusSchema,
  uuidSchema
} from "../utils/validation-schemas.js";

const stayParamsSchema = z.object({
  id: uuidSchema
});

const listStaysQuerySchema = z.object({
  status: stayStatusSchema.optional()
});

const createStaySchema = z
  .object({
    roomId: uuidSchema,
    guestId: uuidSchema,
    checkInDate: isoDateToDateSchema,
    expectedCheckOutDate: isoDateToDateSchema,
    numberOfGuests: z.number().int().positive().max(20),
    pricePerNight: positiveMoneySchema.optional(),
    discount: percentageSchema.nullable().optional()
  })
  .refine((data) => data.expectedCheckOutDate > data.checkInDate, {
    message: "La fecha de salida debe ser posterior a la fecha de ingreso.",
    path: ["expectedCheckOutDate"]
  });

const updateStayDatesSchema = z
  .object({
    checkInDate: isoDateToDateSchema,
    expectedCheckOutDate: isoDateToDateSchema
  })
  .refine((data) => data.expectedCheckOutDate > data.checkInDate, {
    message: "La fecha de salida debe ser posterior a la fecha de ingreso.",
    path: ["expectedCheckOutDate"]
  });

const completeStaySchema = z.object({
  actualCheckOutDate: isoDateToDateSchema
});

export class StayController {
  constructor(
    private readonly createStay: CreateStay,
    private readonly updateStayDates: UpdateStayDates,
    private readonly completeStay: CompleteStay,
    private readonly cancelStay: CancelStay,
    private readonly getActiveStays: GetActiveStays,
    private readonly getStayDetails: GetStayDetails,
    private readonly listStays: ListStays
  ) {}

  list = async (req: Request, res: Response) => {
    const { status } = listStaysQuerySchema.parse(req.query);
    res.json(await this.listStays.execute(status));
  };

  listActive = async (_req: Request, res: Response) => {
    res.json(await this.getActiveStays.execute());
  };

  getById = async (req: Request, res: Response) => {
    const { id } = stayParamsSchema.parse(req.params);
    res.json(await this.getStayDetails.execute(id));
  };

  create = async (req: Request, res: Response) => {
    const payload = createStaySchema.parse(req.body);
    const stay = await this.createStay.execute({
      roomId: payload.roomId,
      guestId: payload.guestId,
      checkInDate: payload.checkInDate,
      expectedCheckOutDate: payload.expectedCheckOutDate,
      numberOfGuests: payload.numberOfGuests,
      pricePerNight: payload.pricePerNight,
      discount: payload.discount ?? null
    });

    res.status(201).json(stay);
  };

  updateDates = async (req: Request, res: Response) => {
    const { id } = stayParamsSchema.parse(req.params);
    const payload = updateStayDatesSchema.parse(req.body);
    const stay = await this.updateStayDates.execute({
      id,
      checkInDate: payload.checkInDate,
      expectedCheckOutDate: payload.expectedCheckOutDate
    });

    res.json(stay);
  };

  complete = async (req: Request, res: Response) => {
    const { id } = stayParamsSchema.parse(req.params);
    const payload = completeStaySchema.parse(req.body);
    const stay = await this.completeStay.execute(id, payload.actualCheckOutDate);
    res.json(stay);
  };

  cancel = async (req: Request, res: Response) => {
    const { id } = stayParamsSchema.parse(req.params);
    const stay = await this.cancelStay.execute(id);
    res.json(stay);
  };
}
