export class Payment {
    id;
    stayId;
    amount;
    method;
    status;
    createdAt;
    constructor(id, stayId, amount, method, status, createdAt) {
        this.id = id;
        this.stayId = stayId;
        this.amount = amount;
        this.method = method;
        this.status = status;
        this.createdAt = createdAt;
    }
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
