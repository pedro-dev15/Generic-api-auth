import jwt from "jsonwebtoken";
import { UserBody } from "./interface";
import "dotenv/config";

const SECRET = process.env.SECRET as string;

//Generate a JWT token
export function generateToken(req: UserBody): string {
  const token = jwt.sign({ email: req.email }, SECRET, { expiresIn: "1h" });
  return token;
}

//Verify a JWT token
export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET) as { email: string };
    return decoded;
  } catch (err) {
    return null;
  }
}
