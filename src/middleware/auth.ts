import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "../utils/jwt.js";
import { verifyToken } from "../utils/jwt.js";

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export function authRequired(
  req: AuthRequest, res: Response, next: NextFunction
){
  const authHeader = req.headers.authorization;
  if(!authHeader?.startsWith("Bearer ")){ //!authHeader || !authHeader.startsWith("Bearer ")
    return res.status(401).json({error: "Missing or invalid token"});
  }

  const token = authHeader.split(" ")[1] as string;

  try{
    const payload = verifyToken(token);
    req.user = payload;
    next();
  }catch(err){
    return res.status(401).json({ error: "Invalid or expired token" });
  }

}