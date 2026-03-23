export class GetRoomsPendingCleaning {
    roomRepository;
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }
    async execute() {
        const rooms = await this.roomRepository.list("CLEANING_PENDING");
        return rooms.map((room) => room.info);
    }
}
