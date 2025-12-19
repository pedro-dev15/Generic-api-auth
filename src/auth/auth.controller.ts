import "dotenv/config";
import type { RequestHandler } from "express";
import { LoginRequest, RegisterRequest } from "../types/auth.ts";
import { loginUseCase } from "./login.usecase.ts";
import { registerUseCase } from "./register.usecase.ts";

// Default route
export const none: RequestHandler = (req, res) => {
  res.send("Hello, the api is running!");
};

//Register a new user
export const register: RequestHandler = async (req, res) => {
  try {
    const body = req.body as RegisterRequest;

    const user = await registerUseCase(body);

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
    const body = req.body as LoginRequest;

    const token = await loginUseCase(body);

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Erro interno do servidor" });
  }
};
