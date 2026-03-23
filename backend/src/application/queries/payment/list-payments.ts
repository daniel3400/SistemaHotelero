import { PaymentRepository } from "../../../domain/repositories/payment-repository.js";

export class ListPayments {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute() {
    const payments = await this.paymentRepository.listAll();
    return payments.map((payment) => payment.info);
  }
}
