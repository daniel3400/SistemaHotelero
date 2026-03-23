import { Payment } from "../../../domain/entities/payment/payment.js";
import { ValidationError } from "../../../shared/errors/validation-error.js";
import { generateId } from "../../../shared/utils/id.js";
export class RegisterPayment {
    paymentRepository;
    stayRepository;
    constructor(paymentRepository, stayRepository) {
        this.paymentRepository = paymentRepository;
        this.stayRepository = stayRepository;
    }
    async execute(input) {
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
        const payment = new Payment(generateId(), input.stayId.trim(), input.amount, input.method, "PENDING", new Date());
        await this.paymentRepository.create(payment);
        return payment.info;
    }
}
