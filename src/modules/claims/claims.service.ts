import { pool } from "../../config/db.js";

export interface CreateClaimInput {
  policyId: string;
  incidentDate?: string;
  claimAmount?: number;
  description?: string;
  customerId: string; // will be looked up / validated
  userId: string;
}

function generateClaimNumber() {
  // Simple example: CLM-YYYYMMDD-random
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `CLM-${datePart}-${rand}`;
}

export async function createClaim(input: CreateClaimInput) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // 1. Verify policy belongs to customer
    const policyRes = await client.query(
      `SELECT id, customer_id
       FROM policies
       WHERE id = $1`,
      [input.policyId]
    );

    const policy = policyRes.rows[0];
    if (!policy) {
      const err: any = new Error("Policy not found");
      err.status = 404;
      throw err;
    }

    if (policy.customer_id !== input.customerId) {
      const err: any = new Error("Policy does not belong to this customer");
      err.status = 400;
      throw err;
    }

    const claimNumber = generateClaimNumber();
    const status = "SUBMITTED";

    // 2. Insert claim
    const claimRes = await client.query(
      `INSERT INTO claims (
         claim_number, policy_id, customer_id,
         status, claim_amount, incident_date,
         description, created_by_user_id
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        claimNumber,
        input.policyId,
        input.customerId,
        status,
        input.claimAmount ?? null,
        input.incidentDate ?? null,
        input.description ?? null,
        input.userId,
      ]
    );

    const claim = claimRes.rows[0];

    // 3. Insert initial status history
    await client.query(
      `INSERT INTO claim_status_history (
         claim_id, old_status, new_status, changed_by_user_id, note
       ) VALUES ($1, NULL, $2, $3, $4)`,
      [claim.id, status, input.userId, "Claim submitted"]
    );

    await client.query("COMMIT");
    return claim;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}