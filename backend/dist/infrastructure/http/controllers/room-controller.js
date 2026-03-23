import { z } from "zod";
import { bedsSchema, maxGuestsSchema, roomNumberSchema, roomStatusSchema, uuidSchema } from "../utils/validation-schemas.js";
const roomParamsSchema = z.object({
    id: uuidSchema
});
const listRoomsQuerySchema = z.object({
    status: roomStatusSchema.optional()
});
const roomCreateSchema = z
    .object({
    hotelId: uuidSchema,
    roomNumber: roomNumberSchema,
    beds: bedsSchema,
    maxGuests: maxGuestsSchema,
    hasDecoder: z.boolean()
})
    .refine((data) => data.beds.reduce((total, bed) => total + bed.quantity, 0) <= data.maxGuests, {
    message: "El maximo de huespedes debe ser mayor o igual al total de camas.",
    path: ["maxGuests"]
});
const roomUpdateSchema = z
    .object({
    beds: bedsSchema,
    maxGuests: maxGuestsSchema,
    hasDecoder: z.boolean()
})
    .refine((data) => data.beds.reduce((total, bed) => total + bed.quantity, 0) <= data.maxGuests, {
    message: "El maximo de huespedes debe ser mayor o igual al total de camas.",
    path: ["maxGuests"]
});
export class RoomController {
    createRoom;
    updateRoomInfo;
    disableRoom;
    enableRoom;
    requestDailyCleaning;
    cancelDailyCleaning;
    markRoomAsClean;
    getRoomDetails;
    listRooms;
    getAvailableRooms;
    getRoomsPendingCleaning;
    getOccupiedRooms;
    constructor(createRoom, updateRoomInfo, disableRoom, enableRoom, requestDailyCleaning, cancelDailyCleaning, markRoomAsClean, getRoomDetails, listRooms, getAvailableRooms, getRoomsPendingCleaning, getOccupiedRooms) {
        this.createRoom = createRoom;
        this.updateRoomInfo = updateRoomInfo;
        this.disableRoom = disableRoom;
        this.enableRoom = enableRoom;
        this.requestDailyCleaning = requestDailyCleaning;
        this.cancelDailyCleaning = cancelDailyCleaning;
        this.markRoomAsClean = markRoomAsClean;
        this.getRoomDetails = getRoomDetails;
        this.listRooms = listRooms;
        this.getAvailableRooms = getAvailableRooms;
        this.getRoomsPendingCleaning = getRoomsPendingCleaning;
        this.getOccupiedRooms = getOccupiedRooms;
    }
    list = async (req, res) => {
        const { status } = listRoomsQuerySchema.parse(req.query);
        const rooms = await this.listRooms.execute(status);
        res.json(rooms);
    };
    getById = async (req, res) => {
        const { id } = roomParamsSchema.parse(req.params);
        res.json(await this.getRoomDetails.execute(id));
    };
    listAvailable = async (_req, res) => {
        res.json(await this.getAvailableRooms.execute());
    };
    listCleaningPending = async (_req, res) => {
        res.json(await this.getRoomsPendingCleaning.execute());
    };
    listOccupied = async (_req, res) => {
        res.json(await this.getOccupiedRooms.execute());
    };
    create = async (req, res) => {
        const payload = roomCreateSchema.parse(req.body);
        const room = await this.createRoom.execute(payload);
        res.status(201).json(room);
    };
    update = async (req, res) => {
        const { id } = roomParamsSchema.parse(req.params);
        const payload = roomUpdateSchema.parse(req.body);
        const room = await this.updateRoomInfo.execute({ id, ...payload });
        res.json(room);
    };
    disable = async (req, res) => {
        const { id } = roomParamsSchema.parse(req.params);
        const room = await this.disableRoom.execute(id);
        res.json(room);
    };
    enable = async (req, res) => {
        const { id } = roomParamsSchema.parse(req.params);
        const room = await this.enableRoom.execute(id);
        res.json(room);
    };
    requestCleaning = async (req, res) => {
        const { id } = roomParamsSchema.parse(req.params);
        const room = await this.requestDailyCleaning.execute(id);
        res.json(room);
    };
    cancelCleaning = async (req, res) => {
        const { id } = roomParamsSchema.parse(req.params);
        const room = await this.cancelDailyCleaning.execute(id);
        res.json(room);
    };
    markAsClean = async (req, res) => {
        const { id } = roomParamsSchema.parse(req.params);
        const room = await this.markRoomAsClean.execute(id);
        res.json(room);
    };
}
