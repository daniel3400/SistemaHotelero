export class GetAvailableRooms {
    roomRepository;
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }
    async execute() {
        const rooms = await this.roomRepository.list("AVAILABLE");
        return rooms.map((room) => room.info);
    }
}
