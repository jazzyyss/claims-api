import type { Request, Response, NextFunction } from "express";
import * as AuthService from "./auth.service.js";

export async function loginHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err: any = new Error("Email and password are required");
      err.status = 400;
      throw err;
    } 

    const result = await AuthService.login(email, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
}