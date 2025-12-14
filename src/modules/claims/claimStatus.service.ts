import { pool } from "../../config/db.js";
import { canTransition } from "./statusRules.js";

export async function updateClaimStatus(
  claimId: string,
  newStatus: string,
  changedByUserId: string,
  note?: string,
  approvedAmount?: number
) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // 1. Get current claim
    const claimRes = await client.query(
      `SELECT status FROM claims WHERE id = $1`,
      [claimId]
    );
    const claim = claimRes.rows[0];

    if (!claim) {
      const err: any = new Error("Claim not found");
      err.status = 404;
      throw err;
    }

    const oldStatus = claim.status;

    // 2. Validate transition
    if (!canTransition(oldStatus, newStatus)) {
      const err: any = new Error(
        `Invalid status transition from ${oldStatus} to ${newStatus}`
      );
      err.status = 400;
      throw err;
    }

    // 3. Update claim (optionally approved_amount)
    await client.query(
      `UPDATE claims
       SET status = $1,
           approved_amount = COALESCE($2, approved_amount),
           updated_at = NOW()
       WHERE id = $3`,
      [newStatus, approvedAmount ?? null, claimId]
    );

    // 4. Insert history
    await client.query(
      `INSERT INTO claim_status_history (
         claim_id, old_status, new_status, changed_by_user_id, note
       ) VALUES ($1, $2, $3, $4, $5)`,
      [claimId, oldStatus, newStatus, changedByUserId, note ?? null]
    );

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}