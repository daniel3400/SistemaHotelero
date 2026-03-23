export class Hotel {
    id;
    name;
    address;
    phone;
    status;
    createdAt;
    constructor(id, name, address, phone, status, createdAt) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.status = status;
        this.createdAt = createdAt;
    }
    get info() {
        return {
            id: this.id,
            name: this.name,
            address: this.address,
            phone: this.phone,
            status: this.status,
            createdAt: this.createdAt
        };
    }
    updateInfo(name, address, phone) {
        if (!name.trim())
            throw new Error("El nombre del hotel es obligatorio.");
        if (!address.trim())
            throw new Error("La direccion del hotel es obligatoria.");
        if (!phone.trim())
            throw new Error("El telefono del hotel es obligatorio.");
        this.name = name;
        this.address = address;
        this.phone = phone;
    }
    activate() {
        this.status = "ACTIVE";
    }
    deactivate() {
        this.status = "INACTIVE";
    }
}
