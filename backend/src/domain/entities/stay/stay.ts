import { StayStatus } from "../../value-objects/statuses.js";

export class Stay {
  constructor(
    public readonly id: string,
    public readonly roomId: string,
    public readonly guestId: string,
    private checkInDate: Date,
    private expectedCheckOutDate: Date,
    private actualCheckOutDate: Date | null,
    private numberOfGuests: number,
    private pricePerNight: number,
    private discount: number | null,
    private totalAmount: number,
    private status: StayStatus
  ) {}

  get info() {
    return {
      id: this.id,
      roomId: this.roomId,
      guestId: this.guestId,
      checkInDate: this.checkInDate,
      expectedCheckOutDate: this.expectedCheckOutDate,
      actualCheckOutDate: this.actualCheckOutDate,
      numberOfGuests: this.numberOfGuests,
      pricePerNight: this.pricePerNight,
      discount: this.discount,
      totalAmount: this.totalAmount,
      status: this.status
    };
  }

  calculateTotal() {
    const nights = Math.max(1, Math.ceil((this.expectedCheckOutDate.getTime() - this.checkInDate.getTime()) / 86400000));
    const base = nights * this.pricePerNight;
    const discountAmount = this.discount ? base * (this.discount / 100) : 0;
    this.totalAmount = Math.max(0, base - discountAmount);
    return this.totalAmount;
  }

  updateDates(checkInDate: Date, expectedCheckOutDate: Date) {
    if (expectedCheckOutDate <= checkInDate) {
      throw new Error("La fecha de salida debe ser posterior a la fecha de ingreso.");
    }
    this.checkInDate = checkInDate;
    this.expectedCheckOutDate = expectedCheckOutDate;
    this.calculateTotal();
  }

  completeStay(actualCheckOutDate: Date) {
    this.actualCheckOutDate = actualCheckOutDate;
    this.status = "COMPLETED";
  }

  cancelStay() {
    this.status = "CANCELLED";
  }
}
