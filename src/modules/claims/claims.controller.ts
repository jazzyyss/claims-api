import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../../middleware/auth.js";
import * as ClaimService from "./claims.service.js";

export async function createClaimHandler(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) {
      const err: any = new Error("Unauthorized");
      err.status = 401;
      throw err;
    }

    const { policyId, incidentDate, claimAmount, description, customerId } =
      req.body;

    if (!policyId || !customerId) {
      const err: any = new Error("policyId and customerId are required");
      err.status = 400;
      throw err;
    }

    const claim = await ClaimService.createClaim({
      policyId,
      incidentDate,
      claimAmount,
      description,
      customerId,
      userId: req.user.userId,
    });

    res.status(201).json(claim);
  } catch (err) {
    next(err);
  }
}