import { Request, Response } from "express";
import { z } from "zod";
import { MarkPaymentAsFailed } from "../../../application/commands/payment/mark-payment-as-failed.js";
import { MarkPaymentAsPaid } from "../../../application/commands/payment/mark-payment-as-paid.js";
import { RegisterPayment } from "../../../application/commands/payment/register-payment.js";
import { GetPaymentDetails } from "../../../application/queries/payment/get-payment-details.js";
import { GetPaymentsByStay } from "../../../application/queries/payment/get-payments-by-stay.js";
import { ListPayments } from "../../../application/queries/payment/list-payments.js";
import {
  paymentMethodSchema,
  positiveMoneySchema,
  uuidSchema
} from "../utils/validation-schemas.js";

const paymentParamsSchema = z.object({
  id: uuidSchema
});

const paymentStayParamsSchema = z.object({
  stayId: uuidSchema
});

const paymentRegisterSchema = z.object({
  stayId: uuidSchema,
  amount: positiveMoneySchema,
  method: paymentMethodSchema
});

export class PaymentController {
  constructor(
    private readonly registerPayment: RegisterPayment,
    private readonly getPaymentsByStay: GetPaymentsByStay,
    private readonly listPayments: ListPayments,
    private readonly getPaymentDetails: GetPaymentDetails,
    private readonly markPaymentAsPaid: MarkPaymentAsPaid,
    private readonly markPaymentAsFailed: MarkPaymentAsFailed
  ) {}

  list = async (_req: Request, res: Response) => {
    res.json(await this.listPayments.execute());
  };

  getById = async (req: Request, res: Response) => {
    const { id } = paymentParamsSchema.parse(req.params);
    res.json(await this.getPaymentDetails.execute(id));
  };

  listByStay = async (req: Request, res: Response) => {
    const { stayId } = paymentStayParamsSchema.parse(req.params);
    res.json(await this.getPaymentsByStay.execute(stayId));
  };

  register = async (req: Request, res: Response) => {
    const payload = paymentRegisterSchema.parse(req.body);
    const payment = await this.registerPayment.execute(payload);
    res.status(201).json(payment);
  };

  markAsPaid = async (req: Request, res: Response) => {
    const { id } = paymentParamsSchema.parse(req.params);
    const payment = await this.markPaymentAsPaid.execute(id);
    res.json(payment);
  };

  markAsFailed = async (req: Request, res: Response) => {
    const { id } = paymentParamsSchema.parse(req.params);
    const payment = await this.markPaymentAsFailed.execute(id);
    res.json(payment);
  };
}
