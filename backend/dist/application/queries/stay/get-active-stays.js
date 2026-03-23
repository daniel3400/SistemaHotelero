export class GetActiveStays {
    stayRepository;
    constructor(stayRepository) {
        this.stayRepository = stayRepository;
    }
    async execute() {
        const stays = await this.stayRepository.list("ACTIVE");
        return stays.map((stay) => stay.info);
    }
}
