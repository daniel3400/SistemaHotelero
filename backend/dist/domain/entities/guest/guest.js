export class Guest {
    id;
    fullName;
    documentNumber;
    phone;
    createdAt;
    constructor(id, fullName, documentNumber, phone, createdAt) {
        this.id = id;
        this.fullName = fullName;
        this.documentNumber = documentNumber;
        this.phone = phone;
        this.createdAt = createdAt;
    }
    get info() {
        return {
            id: this.id,
            fullName: this.fullName,
            documentNumber: this.documentNumber,
            phone: this.phone,
            createdAt: this.createdAt
        };
    }
    updateInfo(fullName, documentNumber, phone) {
        if (!fullName.trim())
            throw new Error("El nombre completo es obligatorio.");
        if (!documentNumber.trim())
            throw new Error("El numero de documento es obligatorio.");
        if (!phone.trim())
            throw new Error("El telefono es obligatorio.");
        this.fullName = fullName;
        this.documentNumber = documentNumber;
        this.phone = phone;
    }
}
