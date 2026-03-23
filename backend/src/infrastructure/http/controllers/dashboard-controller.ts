import { Request, Response } from "express";
import { RoomRepository } from "../../../domain/repositories/room-repository.js";
import { StayRepository } from "../../../domain/repositories/stay-repository.js";
import { PaymentRepository } from "../../../domain/repositories/payment-repository.js";

export class DashboardController {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly stayRepository: StayRepository,
    private readonly paymentRepository: PaymentRepository
  ) {}

  summary = async (_req: Request, res: Response) => {
    const [available, cleaning, occupied, activeStays, payments] = await Promise.all([
      this.roomRepository.list("AVAILABLE"),
      this.roomRepository.list("CLEANING_PENDING"),
      this.roomRepository.list("OCCUPIED"),
      this.stayRepository.list("ACTIVE"),
      this.paymentRepository.listAll()
    ]);

    const pendingPayments = payments.filter((payment) => payment.info.status === "PENDING");

    res.json({
      roomsAvailable: available.length,
      roomsCleaningPending: cleaning.length,
      roomsOccupied: occupied.length,
      activeStays: activeStays.length,
      pendingPayments: pendingPayments.length
    });
  };
}
