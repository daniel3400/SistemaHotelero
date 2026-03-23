export class ListHotels {
    hotelRepository;
    constructor(hotelRepository) {
        this.hotelRepository = hotelRepository;
    }
    async execute() {
        const hotels = await this.hotelRepository.list();
        return hotels.map((hotel) => hotel.info);
    }
}
