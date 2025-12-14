import { pool } from "../../config/db.js";

export async function listCustomers(page = 1, limit = 20) {
  const offset = (page - 1) * limit;
  const { rows } = await pool.query(
    `SELECT id, first_name, last_name, email, phone, city, province
     FROM customers
     ORDER BY created_at DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  return rows;
}

export async function getCustomerById(id: string) {
  const { rows } = await pool.query(
    `SELECT * FROM customers WHERE id = $1`,
    [id]
  );
  return rows[0] || null;
}