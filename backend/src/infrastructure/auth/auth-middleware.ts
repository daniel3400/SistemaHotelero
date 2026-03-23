import { NextFunction, Request, Response } from "express";
import { verifyToken } from "./jwt-service.js";
import { UnauthorizedError } from "../../shared/errors/unauthorized-error.js";

export const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) throw new UnauthorizedError("Debes iniciar sesion.");

  const [, token] = header.split(" ");
  if (!token) throw new UnauthorizedError("Token no proporcionado.");

  const payload = verifyToken(token);
  req.user = payload;
  next();
};
