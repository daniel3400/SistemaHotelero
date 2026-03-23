export class ListRooms {
    roomRepository;
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }
    async execute(status) {
        const rooms = await this.roomRepository.list(status);
        return rooms.map((room) => room.info);
    }
}
