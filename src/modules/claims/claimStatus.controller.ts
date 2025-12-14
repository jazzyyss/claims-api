import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../../middleware/auth.js";
import * as ClaimStatusService from "./claimStatus.service.js";

export async function updateClaimStatusHandler(
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

    const claimId = req.params.id;
    const { newStatus, note, approvedAmount } = req.body;

    if (!claimId) {
      const err: any = new Error("Claim ID is required");
      err.status = 400;
      throw err;
    }
    
    if (!newStatus) {
      const err: any = new Error("newStatus is required");
      err.status = 400;
      throw err;
    }

    await ClaimStatusService.updateClaimStatus(
      claimId,
      newStatus,
      req.user.userId,
      note,
      approvedAmount
    );

    res.json({ message: "Status updated" });
  } catch (err) {
    next(err);
  }
}