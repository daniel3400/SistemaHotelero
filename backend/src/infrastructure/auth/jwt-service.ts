import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../../shared/errors/unauthorized-error.js";

export interface JwtPayload {
  sub: string;
  username: string;
  role: "ADMIN";
}

export const signToken = (payload: JwtPayload) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET no configurado.");
  return jwt.sign(payload, secret, { expiresIn: "8h" });
};

export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET no configurado.");
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch {
    throw new UnauthorizedError("Token invalido o expirado.");
  }
};
