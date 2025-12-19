import jwt from "jsonwebtoken";
import { RegisterRequest, LoginRequest } from "../../types/auth";
import "dotenv/config";

const SECRET = process.env.SECRET as string;

//Generate a JWT token
export function generateToken(req: RegisterRequest): string {
  const token = jwt.sign({ email: req.email }, SECRET, { expiresIn: "1h" });
  return token;
}

//Verify a JWT token
export function verifyToken(token: string): string | null {
  try {
    const decoded = jwt.verify(token, SECRET) as { email: string };
    return decoded.email;
  } catch (err) {
    return null;
  }
}
