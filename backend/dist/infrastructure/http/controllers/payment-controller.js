import { z } from "zod";
import { paymentMethodSchema, positiveMoneySchema, uuidSchema } from "../utils/validation-schemas.js";
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
    registerPayment;
    getPaymentsByStay;
    listPayments;
    getPaymentDetails;
    markPaymentAsPaid;
    markPaymentAsFailed;
    constructor(registerPayment, getPaymentsByStay, listPayments, getPaymentDetails, markPaymentAsPaid, markPaymentAsFailed) {
        this.registerPayment = registerPayment;
        this.getPaymentsByStay = getPaymentsByStay;
        this.listPayments = listPayments;
        this.getPaymentDetails = getPaymentDetails;
        this.markPaymentAsPaid = markPaymentAsPaid;
        this.markPaymentAsFailed = markPaymentAsFailed;
    }
    list = async (_req, res) => {
        res.json(await this.listPayments.execute());
    };
    getById = async (req, res) => {
        const { id } = paymentParamsSchema.parse(req.params);
        res.json(await this.getPaymentDetails.execute(id));
    };
    listByStay = async (req, res) => {
        const { stayId } = paymentStayParamsSchema.parse(req.params);
        res.json(await this.getPaymentsByStay.execute(stayId));
    };
    register = async (req, res) => {
        const payload = paymentRegisterSchema.parse(req.body);
        const payment = await this.registerPayment.execute(payload);
        res.status(201).json(payment);
    };
    markAsPaid = async (req, res) => {
        const { id } = paymentParamsSchema.parse(req.params);
        const payment = await this.markPaymentAsPaid.execute(id);
        res.json(payment);
    };
    markAsFailed = async (req, res) => {
        const { id } = paymentParamsSchema.parse(req.params);
        const payment = await this.markPaymentAsFailed.execute(id);
        res.json(payment);
    };
}
