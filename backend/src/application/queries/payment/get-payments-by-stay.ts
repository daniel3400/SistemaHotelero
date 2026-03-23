import { PaymentRepository } from "../../../domain/repositories/payment-repository.js";

export class GetPaymentsByStay {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute(stayId: string) {
    const payments = await this.paymentRepository.listByStay(stayId);
    return payments.map((payment) => payment.info);
  }
}
