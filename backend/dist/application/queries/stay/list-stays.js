export class ListStays {
    stayRepository;
    constructor(stayRepository) {
        this.stayRepository = stayRepository;
    }
    async execute(status) {
        const stays = await this.stayRepository.list(status);
        return stays.map((stay) => stay.info);
    }
}
