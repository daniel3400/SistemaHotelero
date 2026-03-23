import { AdminUser } from "../../../domain/entities/user/admin-user.js";
export class UserPgRepository {
    pool;
    constructor(pool) {
        this.pool = pool;
    }
    async getByUsername(username) {
        const result = await this.pool.query("SELECT id, username, password_hash, created_at FROM admin_users WHERE username = $1", [username]);
        if (result.rowCount === 0)
            return null;
        const row = result.rows[0];
        return new AdminUser(row.id, row.username, row.password_hash, row.created_at);
    }
    async create(user) {
        const info = user.info;
        await this.pool.query("INSERT INTO admin_users (id, username, password_hash, created_at) VALUES ($1,$2,$3,$4)", [info.id, info.username, info.passwordHash, info.createdAt]);
    }
}
