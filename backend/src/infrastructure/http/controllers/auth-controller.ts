import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { UserRepository } from "../../../domain/repositories/user-repository.js";
import { UnauthorizedError } from "../../../shared/errors/unauthorized-error.js";
import { signToken } from "../../auth/jwt-service.js";

const loginSchema = z.object({
  username: z.string().trim().min(3).max(60),
  password: z.string().min(6).max(128)
});

export class AuthController {
  constructor(private readonly userRepository: UserRepository) {}

  login = async (req: Request, res: Response) => {
    const { username, password } = loginSchema.parse(req.body);

    const user = await this.userRepository.getByUsername(username);
    if (!user) throw new UnauthorizedError("Credenciales invalidas.");

    const isValid = await bcrypt.compare(password, user.info.passwordHash);
    if (!isValid) throw new UnauthorizedError("Credenciales invalidas.");

    const token = signToken({ sub: user.info.id, username: user.info.username, role: "ADMIN" });
    res.json({ token });
  };
}
