import { pool } from "../../config/db.js";
import { comparePassword } from "../../utils/password.js";
import { signToken } from "../../utils/jwt.js";

export async function login(email: string, password: string){
  const {rows} = await pool.query(
    "SELECT id, password_hash, role FROM users WHERE email = $1 AND is_active = true",
    [email]
  );

  const user = rows[0];
  if(!user){
    const err: any = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const match = await comparePassword(password, user.password_hash);
  if(!match){
    const err: any = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const token = signToken({userId: user.id, role: user.role});
  return { token, role: user.role, userId: user.id };
}