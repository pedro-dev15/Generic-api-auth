import { prisma } from "./lib/prisma.ts";
import { getHash, compareHash } from "./services/bcrypt.ts";
import { generateToken } from "./services/JWT.ts";
import "dotenv/config";
import type { Request, Response, RequestHandler } from "express";

// Default route
export function none(req: Request, res: Response) {
  res.send("Hello, the api is running!");
}

//Register a new user
export const register: RequestHandler = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const hash: string = await getHash(password);

    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hash,
      },
    });

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      userId: user.id,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erro ao criar usuário" });
  }
};

//Login a user
export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "E-mail ou senha inválidos" });
    }

    const isMatch = await compareHash(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Incorreto" });
    }

    const token = generateToken(user);

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
