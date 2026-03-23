import bcrypt from "bcryptjs";
import { AdminUser } from "../../domain/entities/user/admin-user.js";
import { generateId } from "../../shared/utils/id.js";
export const ensureAdminUser = async (userRepository) => {
    const existing = await userRepository.getByUsername("admin");
    if (existing)
        return;
    const passwordHash = await bcrypt.hash("Bariloche2026$k8", 10);
    const admin = new AdminUser(generateId(), "admin", passwordHash, new Date());
    await userRepository.create(admin);
};
