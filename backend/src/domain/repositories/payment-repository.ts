import { Payment } from "../entities/payment/payment.js";

export interface PaymentRepository {
  create(payment: Payment): Promise<void>;
  update(payment: Payment): Promise<void>;
  getById(id: string): Promise<Payment | null>;
  listByStay(stayId: string): Promise<Payment[]>;
  listAll(): Promise<Payment[]>;
}
