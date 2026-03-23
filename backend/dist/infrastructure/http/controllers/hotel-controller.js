import { z } from "zod";
import { addressSchema, hotelNameSchema, phoneSchema, uuidSchema } from "../utils/validation-schemas.js";
const hotelPayloadSchema = z.object({
    name: hotelNameSchema,
    address: addressSchema,
    phone: phoneSchema
});
const hotelParamsSchema = z.object({
    id: uuidSchema
});
export class HotelController {
    createHotel;
    updateHotelInfo;
    activateHotel;
    deactivateHotel;
    getHotelInfo;
    listHotels;
    constructor(createHotel, updateHotelInfo, activateHotel, deactivateHotel, getHotelInfo, listHotels) {
        this.createHotel = createHotel;
        this.updateHotelInfo = updateHotelInfo;
        this.activateHotel = activateHotel;
        this.deactivateHotel = deactivateHotel;
        this.getHotelInfo = getHotelInfo;
        this.listHotels = listHotels;
    }
    list = async (_req, res) => {
        res.json(await this.listHotels.execute());
    };
    getById = async (req, res) => {
        const { id } = hotelParamsSchema.parse(req.params);
        res.json(await this.getHotelInfo.execute(id));
    };
    create = async (req, res) => {
        const payload = hotelPayloadSchema.parse(req.body);
        const hotel = await this.createHotel.execute(payload);
        res.status(201).json(hotel);
    };
    update = async (req, res) => {
        const { id } = hotelParamsSchema.parse(req.params);
        const payload = hotelPayloadSchema.parse(req.body);
        const hotel = await this.updateHotelInfo.execute({ id, ...payload });
        res.json(hotel);
    };
    activate = async (req, res) => {
        const { id } = hotelParamsSchema.parse(req.params);
        const hotel = await this.activateHotel.execute(id);
        res.json(hotel);
    };
    deactivate = async (req, res) => {
        const { id } = hotelParamsSchema.parse(req.params);
        const hotel = await this.deactivateHotel.execute(id);
        res.json(hotel);
    };
}
