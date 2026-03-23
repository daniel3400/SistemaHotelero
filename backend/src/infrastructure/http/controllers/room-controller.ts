import { Request, Response } from "express";
import { z } from "zod";
import { CreateRoom } from "../../../application/commands/room/create-room.js";
import { UpdateRoomInfo } from "../../../application/commands/room/update-room-info.js";
import { DisableRoom } from "../../../application/commands/room/disable-room.js";
import { EnableRoom } from "../../../application/commands/room/enable-room.js";
import { RequestDailyCleaning } from "../../../application/commands/room/request-daily-cleaning.js";
import { CancelDailyCleaning } from "../../../application/commands/room/cancel-daily-cleaning.js";
import { MarkRoomAsClean } from "../../../application/commands/room/mark-room-as-clean.js";
import { GetRoomDetails } from "../../../application/queries/room/get-room-details.js";
import { ListRooms } from "../../../application/queries/room/list-rooms.js";
import { GetAvailableRooms } from "../../../application/queries/room/get-available-rooms.js";
import { GetRoomsPendingCleaning } from "../../../application/queries/room/get-rooms-pending-cleaning.js";
import { GetOccupiedRooms } from "../../../application/queries/room/get-occupied-rooms.js";
import { RoomStatus } from "../../../domain/value-objects/statuses.js";
import {
  bedsSchema,
  maxGuestsSchema,
  roomNumberSchema,
  roomStatusSchema,
  uuidSchema
} from "../utils/validation-schemas.js";

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
  .refine(
    (data) => data.beds.reduce((total, bed) => total + bed.quantity, 0) <= data.maxGuests,
    {
      message: "El maximo de huespedes debe ser mayor o igual al total de camas.",
      path: ["maxGuests"]
    }
  );

const roomUpdateSchema = z
  .object({
    beds: bedsSchema,
    maxGuests: maxGuestsSchema,
    hasDecoder: z.boolean()
  })
  .refine(
    (data) => data.beds.reduce((total, bed) => total + bed.quantity, 0) <= data.maxGuests,
    {
      message: "El maximo de huespedes debe ser mayor o igual al total de camas.",
      path: ["maxGuests"]
    }
  );

export class RoomController {
  constructor(
    private readonly createRoom: CreateRoom,
    private readonly updateRoomInfo: UpdateRoomInfo,
    private readonly disableRoom: DisableRoom,
    private readonly enableRoom: EnableRoom,
    private readonly requestDailyCleaning: RequestDailyCleaning,
    private readonly cancelDailyCleaning: CancelDailyCleaning,
    private readonly markRoomAsClean: MarkRoomAsClean,
    private readonly getRoomDetails: GetRoomDetails,
    private readonly listRooms: ListRooms,
    private readonly getAvailableRooms: GetAvailableRooms,
    private readonly getRoomsPendingCleaning: GetRoomsPendingCleaning,
    private readonly getOccupiedRooms: GetOccupiedRooms
  ) {}

  list = async (req: Request, res: Response) => {
    const { status } = listRoomsQuerySchema.parse(req.query) as { status?: RoomStatus };
    const rooms = await this.listRooms.execute(status);
    res.json(rooms);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = roomParamsSchema.parse(req.params);
    res.json(await this.getRoomDetails.execute(id));
  };

  listAvailable = async (_req: Request, res: Response) => {
    res.json(await this.getAvailableRooms.execute());
  };

  listCleaningPending = async (_req: Request, res: Response) => {
    res.json(await this.getRoomsPendingCleaning.execute());
  };

  listOccupied = async (_req: Request, res: Response) => {
    res.json(await this.getOccupiedRooms.execute());
  };

  create = async (req: Request, res: Response) => {
    const payload = roomCreateSchema.parse(req.body);
    const room = await this.createRoom.execute(payload);
    res.status(201).json(room);
  };

  update = async (req: Request, res: Response) => {
    const { id } = roomParamsSchema.parse(req.params);
    const payload = roomUpdateSchema.parse(req.body);
    const room = await this.updateRoomInfo.execute({ id, ...payload });
    res.json(room);
  };

  disable = async (req: Request, res: Response) => {
    const { id } = roomParamsSchema.parse(req.params);
    const room = await this.disableRoom.execute(id);
    res.json(room);
  };

  enable = async (req: Request, res: Response) => {
    const { id } = roomParamsSchema.parse(req.params);
    const room = await this.enableRoom.execute(id);
    res.json(room);
  };

  requestCleaning = async (req: Request, res: Response) => {
    const { id } = roomParamsSchema.parse(req.params);
    const room = await this.requestDailyCleaning.execute(id);
    res.json(room);
  };

  cancelCleaning = async (req: Request, res: Response) => {
    const { id } = roomParamsSchema.parse(req.params);
    const room = await this.cancelDailyCleaning.execute(id);
    res.json(room);
  };

  markAsClean = async (req: Request, res: Response) => {
    const { id } = roomParamsSchema.parse(req.params);
    const room = await this.markRoomAsClean.execute(id);
    res.json(room);
  };
}
