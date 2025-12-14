import { Router } from "express";
import { listCustomersHandler } from "./customer.controller.js";
import { authRequired } from "../../middleware/auth.js";
import { requireRole } from "../../middleware/authorize.js";

export const customerRouter = Router();

customerRouter.use(authRequired); // all routes require auth

customerRouter.get(
  "/",
  requireRole("ADMIN", "ADJUSTER"),
  listCustomersHandler
);