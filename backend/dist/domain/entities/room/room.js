export class Room {
    id;
    hotelId;
    roomNumber;
    beds;
    maxGuests;
    hasDecoder;
    status;
    dailyCleaningRequested;
    requiresCleaning;
    createdAt;
    constructor(id, hotelId, roomNumber, beds, maxGuests, hasDecoder, status, dailyCleaningRequested, requiresCleaning, createdAt) {
        this.id = id;
        this.hotelId = hotelId;
        this.roomNumber = roomNumber;
        this.beds = beds;
        this.maxGuests = maxGuests;
        this.hasDecoder = hasDecoder;
        this.status = status;
        this.dailyCleaningRequested = dailyCleaningRequested;
        this.requiresCleaning = requiresCleaning;
        this.createdAt = createdAt;
    }
    get info() {
        return {
            id: this.id,
            hotelId: this.hotelId,
            roomNumber: this.roomNumber,
            beds: this.beds,
            maxGuests: this.maxGuests,
            hasDecoder: this.hasDecoder,
            status: this.status,
            dailyCleaningRequested: this.dailyCleaningRequested,
            requiresCleaning: this.requiresCleaning,
            createdAt: this.createdAt
        };
    }
    updateInfo(beds, maxGuests, hasDecoder) {
        if (maxGuests <= 0)
            throw new Error("El maximo de huespedes debe ser mayor a cero.");
        this.beds = beds;
        this.maxGuests = maxGuests;
        this.hasDecoder = hasDecoder;
    }
    occupy() {
        if (this.status === "DISABLED")
            throw new Error("La habitacion esta deshabilitada.");
        this.status = "OCCUPIED";
        this.requiresCleaning = true;
    }
    checkout() {
        if (this.requiresCleaning) {
            this.status = "CLEANING_PENDING";
            return;
        }
        this.status = "AVAILABLE";
    }
    markAsClean() {
        this.requiresCleaning = false;
        this.status = "AVAILABLE";
    }
    requestDailyCleaning() {
        this.dailyCleaningRequested = true;
        this.status = "CLEANING_PENDING";
    }
    cancelDailyCleaning() {
        this.dailyCleaningRequested = false;
        if (this.requiresCleaning) {
            this.status = "CLEANING_PENDING";
            return;
        }
        this.status = "AVAILABLE";
    }
    disable() {
        this.status = "DISABLED";
    }
    enable() {
        this.status = "AVAILABLE";
    }
}
