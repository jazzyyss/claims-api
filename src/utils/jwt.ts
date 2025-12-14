import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JET_SECRET as string;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET not set");
}

export interface JwtPayload{
  userId: string;
  role: "ADMIN" | "ADJUSTER" | "CUSTOMER";
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "8h", algorithm: "HS256" });
}

export function verifyToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, JWT_SECRET);

  if (typeof decoded === "string") {
    throw new Error("Invalid token payload");
  }

  return decoded as JwtPayload;
}