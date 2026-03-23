export class ListPayments {
    paymentRepository;
    constructor(paymentRepository) {
        this.paymentRepository = paymentRepository;
    }
    async execute() {
        const payments = await this.paymentRepository.listAll();
        return payments.map((payment) => payment.info);
    }
}
