import { Router } from "express";
import { authRequired } from "../../middleware/auth.js";
import { requireRole } from "../../middleware/authorize.js";
import { createClaimHandler } from "./claims.controller.js";

export const claimRouter = Router();

claimRouter.use(authRequired);

claimRouter.post(
  "/",
  requireRole("CUSTOMER", "ADMIN"), // admin can create on behalf as well
  createClaimHandler
);
