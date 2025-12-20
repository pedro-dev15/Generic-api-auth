import "dotenv/config";
import type { RequestHandler } from "express";
import { LoginRequest, RegisterRequest } from "../types/auth.ts";
import { loginUseCase } from "../useCases/login.usecase.ts";
import { registerUseCase } from "../useCases/register.usecase.ts";

/**
 * Rota padrão para verificar se a API está rodando.
 * Não contém regra de negócio.
 */
export const none: RequestHandler = (req, res) => {
  res.send("Hello, the api is running!");
};

/**
 * Controller de registro de usuário.
 * Responsável apenas por:
 * - Ler dados da requisição HTTP
 * - Chamar o caso de uso de registro
 * - Retornar resposta HTTP
 */
export const register: RequestHandler = async (req, res) => {
  try {
    // DTO da camada HTTP
    const body = req.body as RegisterRequest;

    // Chamada do caso de uso (regra de negócio)
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

/**
 * Controller de login.
 * Não contém lógica de autenticação.
 * Apenas delega para o use case e traduz erros para HTTP.
 */
export const login: RequestHandler = async (req, res) => {
  try {
    // DTO da requisição HTTP
    const body = req.body as LoginRequest;

    // Delegação da regra de negócio para o use case
    const token = await loginUseCase(body);

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    // Erro esperado de autenticação
    res.status(401).json({ error: "Erro interno do servidor" });
  }
};

export const profile: RequestHandler = async (req, res) => {
  // Este controller só deve ser acessado por usuários autenticados,
  // garantindo que o middleware de autenticação seja aplicado na rota correspondente.

  // O usuário autenticado é adicionado ao req pelo middleware auth.
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  // Retorna os dados do usuário autenticado
  res.status(200).json({
    message: "Perfil do usuário",
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
};
