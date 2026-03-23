import { RoomBed } from "../../value-objects/room-bed.js";
import { RoomStatus } from "../../value-objects/statuses.js";

export class Room {
  constructor(
    public readonly id: string,
    public readonly hotelId: string,
    public readonly roomNumber: string,
    private beds: RoomBed[],
    private maxGuests: number,
    private hasDecoder: boolean,
    private status: RoomStatus,
    private dailyCleaningRequested: boolean,
    private requiresCleaning: boolean,
    public readonly createdAt: Date
  ) {}

  get info() {
    return {
      id: this.id,
      hotelId: this.hotelId,
      roomNumber: this.roomNumber,
      beds: this.beds,
      maxGuests: this.maxGuests,
      hasDecoder: this.hasDecoder,
      status: this.status,
      dailyCleaningRequested: this.dailyCleaningRequested,
      requiresCleaning: this.requiresCleaning,
      createdAt: this.createdAt
    };
  }

  updateInfo(beds: RoomBed[], maxGuests: number, hasDecoder: boolean) {
    if (maxGuests <= 0) throw new Error("El maximo de huespedes debe ser mayor a cero.");
    this.beds = beds;
    this.maxGuests = maxGuests;
    this.hasDecoder = hasDecoder;
  }

  occupy() {
    if (this.status === "DISABLED") throw new Error("La habitacion esta deshabilitada.");
    this.status = "OCCUPIED";
    this.requiresCleaning = true;
  }

  checkout() {
    if (this.requiresCleaning) {
      this.status = "CLEANING_PENDING";
      return;
    }
    this.status = "AVAILABLE";
  }

  markAsClean() {
    this.requiresCleaning = false;
    this.status = "AVAILABLE";
  }

  requestDailyCleaning() {
    this.dailyCleaningRequested = true;
    this.status = "CLEANING_PENDING";
  }

  cancelDailyCleaning() {
    this.dailyCleaningRequested = false;
    if (this.requiresCleaning) {
      this.status = "CLEANING_PENDING";
      return;
    }
    this.status = "AVAILABLE";
  }

  disable() {
    this.status = "DISABLED";
  }

  enable() {
    this.status = "AVAILABLE";
  }
}
