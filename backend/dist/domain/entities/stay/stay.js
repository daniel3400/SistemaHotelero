export class Stay {
    id;
    roomId;
    guestId;
    checkInDate;
    expectedCheckOutDate;
    actualCheckOutDate;
    numberOfGuests;
    pricePerNight;
    discount;
    totalAmount;
    status;
    constructor(id, roomId, guestId, checkInDate, expectedCheckOutDate, actualCheckOutDate, numberOfGuests, pricePerNight, discount, totalAmount, status) {
        this.id = id;
        this.roomId = roomId;
        this.guestId = guestId;
        this.checkInDate = checkInDate;
        this.expectedCheckOutDate = expectedCheckOutDate;
        this.actualCheckOutDate = actualCheckOutDate;
        this.numberOfGuests = numberOfGuests;
        this.pricePerNight = pricePerNight;
        this.discount = discount;
        this.totalAmount = totalAmount;
        this.status = status;
    }
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
    updateDates(checkInDate, expectedCheckOutDate) {
        if (expectedCheckOutDate <= checkInDate) {
            throw new Error("La fecha de salida debe ser posterior a la fecha de ingreso.");
        }
        this.checkInDate = checkInDate;
        this.expectedCheckOutDate = expectedCheckOutDate;
        this.calculateTotal();
    }
    completeStay(actualCheckOutDate) {
        this.actualCheckOutDate = actualCheckOutDate;
        this.status = "COMPLETED";
    }
    cancelStay() {
        this.status = "CANCELLED";
    }
}
