import { PaymentMethod, PaymentStatus } from "../../value-objects/statuses.js";

export class Payment {
  constructor(
    public readonly id: string,
    public readonly stayId: string,
    private amount: number,
    private method: PaymentMethod,
    private status: PaymentStatus,
    public readonly createdAt: Date
  ) {}

  get info() {
    return {
      id: this.id,
      stayId: this.stayId,
      amount: this.amount,
      method: this.method,
      status: this.status,
      createdAt: this.createdAt
    };
  }

  markAsPaid() {
    this.status = "PAID";
  }

  markAsFailed() {
    this.status = "FAILED";
  }
}
