export class DashboardController {
    roomRepository;
    stayRepository;
    paymentRepository;
    constructor(roomRepository, stayRepository, paymentRepository) {
        this.roomRepository = roomRepository;
        this.stayRepository = stayRepository;
        this.paymentRepository = paymentRepository;
    }
    summary = async (_req, res) => {
        const [available, cleaning, occupied, activeStays, payments] = await Promise.all([
            this.roomRepository.list("AVAILABLE"),
            this.roomRepository.list("CLEANING_PENDING"),
            this.roomRepository.list("OCCUPIED"),
            this.stayRepository.list("ACTIVE"),
            this.paymentRepository.listAll()
        ]);
        const pendingPayments = payments.filter((payment) => payment.info.status === "PENDING");
        res.json({
            roomsAvailable: available.length,
            roomsCleaningPending: cleaning.length,
            roomsOccupied: occupied.length,
            activeStays: activeStays.length,
            pendingPayments: pendingPayments.length
        });
    };
}
