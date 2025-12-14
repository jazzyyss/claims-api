import type { Request, Response, NextFunction } from "express";
import * as CustomerService from "./customer.service.js";

export async function listCustomersHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const customers = await CustomerService.listCustomers(page, limit);
    res.json({ data: customers, page, limit });
  } catch (err) {
    next(err);
  }
}