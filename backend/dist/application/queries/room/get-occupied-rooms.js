export class GetOccupiedRooms {
    roomRepository;
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }
    async execute() {
        const rooms = await this.roomRepository.list("OCCUPIED");
        return rooms.map((room) => room.info);
    }
}
