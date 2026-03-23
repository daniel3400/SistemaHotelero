export class ListGuests {
    guestRepository;
    constructor(guestRepository) {
        this.guestRepository = guestRepository;
    }
    async execute() {
        const guests = await this.guestRepository.list();
        return guests.map((guest) => guest.info);
    }
}
