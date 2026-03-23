import { AdminUser } from "../entities/user/admin-user.js";

export interface UserRepository {
  getByUsername(username: string): Promise<AdminUser | null>;
  create(user: AdminUser): Promise<void>;
}
