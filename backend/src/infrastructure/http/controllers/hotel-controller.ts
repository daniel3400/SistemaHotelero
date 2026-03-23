import { Request, Response } from "express";
import { z } from "zod";
import { CreateHotel } from "../../../application/commands/hotel/create-hotel.js";
import { UpdateHotelInfo } from "../../../application/commands/hotel/update-hotel-info.js";
import { ActivateHotel } from "../../../application/commands/hotel/activate-hotel.js";
import { DeactivateHotel } from "../../../application/commands/hotel/deactivate-hotel.js";
import { GetHotelInfo } from "../../../application/queries/hotel/get-hotel-info.js";
import { ListHotels } from "../../../application/queries/hotel/list-hotels.js";
import {
  addressSchema,
  hotelNameSchema,
  phoneSchema,
  uuidSchema
} from "../utils/validation-schemas.js";

const hotelPayloadSchema = z.object({
  name: hotelNameSchema,
  address: addressSchema,
  phone: phoneSchema
});

const hotelParamsSchema = z.object({
  id: uuidSchema
});

export class HotelController {
  constructor(
    private readonly createHotel: CreateHotel,
    private readonly updateHotelInfo: UpdateHotelInfo,
    private readonly activateHotel: ActivateHotel,
    private readonly deactivateHotel: DeactivateHotel,
    private readonly getHotelInfo: GetHotelInfo,
    private readonly listHotels: ListHotels
  ) {}

  list = async (_req: Request, res: Response) => {
    res.json(await this.listHotels.execute());
  };

  getById = async (req: Request, res: Response) => {
    const { id } = hotelParamsSchema.parse(req.params);
    res.json(await this.getHotelInfo.execute(id));
  };

  create = async (req: Request, res: Response) => {
    const payload = hotelPayloadSchema.parse(req.body);
    const hotel = await this.createHotel.execute(payload);
    res.status(201).json(hotel);
  };

  update = async (req: Request, res: Response) => {
    const { id } = hotelParamsSchema.parse(req.params);
    const payload = hotelPayloadSchema.parse(req.body);
    const hotel = await this.updateHotelInfo.execute({ id, ...payload });
    res.json(hotel);
  };

  activate = async (req: Request, res: Response) => {
    const { id } = hotelParamsSchema.parse(req.params);
    const hotel = await this.activateHotel.execute(id);
    res.json(hotel);
  };

  deactivate = async (req: Request, res: Response) => {
    const { id } = hotelParamsSchema.parse(req.params);
    const hotel = await this.deactivateHotel.execute(id);
    res.json(hotel);
  };
}
