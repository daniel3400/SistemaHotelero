export class AdminUser {
  constructor(
    public readonly id: string,
    private username: string,
    private passwordHash: string,
    public readonly createdAt: Date
  ) {}

  get info() {
    return {
      id: this.id,
      username: this.username,
      passwordHash: this.passwordHash,
      createdAt: this.createdAt
    };
  }
}
