import "express";
import { JwtPayload } from "../../infrastructure/auth/jwt-service.js";

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}
