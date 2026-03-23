import { NotFoundError } from "../../../shared/errors/not-found-error.js";
export class MarkPaymentAsFailed {
    paymentRepository;
    constructor(paymentRepository) {
        this.paymentRepository = paymentRepository;
    }
    async execute(id) {
        const payment = await this.paymentRepository.getById(id);
        if (!payment)
            throw new NotFoundError("Pago no encontrado.");
        payment.markAsFailed();
        await this.paymentRepository.update(payment);
        return payment.info;
    }
}
