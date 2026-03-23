export class GetPaymentsByStay {
    paymentRepository;
    constructor(paymentRepository) {
        this.paymentRepository = paymentRepository;
    }
    async execute(stayId) {
        const payments = await this.paymentRepository.listByStay(stayId);
        return payments.map((payment) => payment.info);
    }
}
