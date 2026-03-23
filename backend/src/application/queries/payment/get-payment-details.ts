import { PaymentRepository } from "../../../domain/repositories/payment-repository.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";

export class GetPaymentDetails {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute(id: string) {
    const payment = await this.paymentRepository.getById(id);
    if (!payment) throw new NotFoundError("Pago no encontrado.");
    return payment.info;
  }
}
