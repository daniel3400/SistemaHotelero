import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../../shared/errors/unauthorized-error.js";
export const signToken = (payload) => {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error("JWT_SECRET no configurado.");
    return jwt.sign(payload, secret, { expiresIn: "8h" });
};
export const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error("JWT_SECRET no configurado.");
    try {
        return jwt.verify(token, secret);
    }
    catch {
        throw new UnauthorizedError("Token invalido o expirado.");
    }
};
