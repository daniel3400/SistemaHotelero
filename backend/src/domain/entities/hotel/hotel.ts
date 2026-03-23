import { HotelStatus } from "../../value-objects/statuses.js";

export class Hotel {
  constructor(
    public readonly id: string,
    private name: string,
    private address: string,
    private phone: string,
    private status: HotelStatus,
    public readonly createdAt: Date
  ) {}

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

  updateInfo(name: string, address: string, phone: string) {
    if (!name.trim()) throw new Error("El nombre del hotel es obligatorio.");
    if (!address.trim()) throw new Error("La direccion del hotel es obligatoria.");
    if (!phone.trim()) throw new Error("El telefono del hotel es obligatorio.");

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
