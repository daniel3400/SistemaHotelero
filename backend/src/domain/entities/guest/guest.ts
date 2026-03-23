export class Guest {
  constructor(
    public readonly id: string,
    private fullName: string,
    private documentNumber: string,
    private phone: string,
    public readonly createdAt: Date
  ) {}

  get info() {
    return {
      id: this.id,
      fullName: this.fullName,
      documentNumber: this.documentNumber,
      phone: this.phone,
      createdAt: this.createdAt
    };
  }

  updateInfo(fullName: string, documentNumber: string, phone: string) {
    if (!fullName.trim()) throw new Error("El nombre completo es obligatorio.");
    if (!documentNumber.trim()) throw new Error("El numero de documento es obligatorio.");
    if (!phone.trim()) throw new Error("El telefono es obligatorio.");

    this.fullName = fullName;
    this.documentNumber = documentNumber;
    this.phone = phone;
  }
}
