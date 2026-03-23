export class AdminUser {
    id;
    username;
    passwordHash;
    createdAt;
    constructor(id, username, passwordHash, createdAt) {
        this.id = id;
        this.username = username;
        this.passwordHash = passwordHash;
        this.createdAt = createdAt;
    }
    get info() {
        return {
            id: this.id,
            username: this.username,
            passwordHash: this.passwordHash,
            createdAt: this.createdAt
        };
    }
}
