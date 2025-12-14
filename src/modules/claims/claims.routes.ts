import { Router } from "express";
import { authRequired } from "../../middleware/auth.js";
import { requireRole } from "../../middleware/authorize.js";
import { createClaimHandler } from "./claims.controller.js";
import { updateClaimStatusHandler } from "./claimStatus.controller.js";

export const claimRouter = Router();

claimRouter.use(authRequired);

claimRouter.post(
  "/",
  requireRole("CUSTOMER", "ADMIN"), // admin can create on behalf as well
  createClaimHandler
);

claimRouter.patch(
  "/:id/status",
  requireRole("ADJUSTER", "ADMIN"),
  updateClaimStatusHandler
);