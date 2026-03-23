import { Payment } from "../../../domain/entities/payment/payment.js";
import { PaymentRepository } from "../../../domain/repositories/payment-repository.js";
import { StayRepository } from "../../../domain/repositories/stay-repository.js";
import { PaymentMethod } from "../../../domain/value-objects/statuses.js";
import { ValidationError } from "../../../shared/errors/validation-error.js";
import { generateId } from "../../../shared/utils/id.js";

interface RegisterPaymentInput {
  stayId: string;
  amount: number;
  method: PaymentMethod;
}

export class RegisterPayment {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly stayRepository: StayRepository
  ) {}

  async execute(input: RegisterPaymentInput) {
    if (!input.stayId.trim()) {
      throw new ValidationError("La estancia del pago es obligatoria.");
    }

    if (input.amount <= 0) {
      throw new ValidationError("El monto del pago debe ser mayor a cero.");
    }

    const stay = await this.stayRepository.getById(input.stayId.trim());
    if (!stay) {
      throw new ValidationError("La estancia no existe.");
    }

    if (stay.info.status === "CANCELLED") {
      throw new ValidationError("No se pueden registrar pagos para una estancia cancelada.");
    }

    const payment = new Payment(
      generateId(),
      input.stayId.trim(),
      input.amount,
      input.method,
      "PENDING",
      new Date()
    );

    await this.paymentRepository.create(payment);
    return payment.info;
  }
}
