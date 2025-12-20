import { compareHash } from "../infra/crypto/bcrypt.ts";
import { prisma } from "../lib/prisma.ts";
import { generateToken } from "../infra/token/JWT.ts";

/**
 * Input de domínio do caso de uso de login.
 * Não é DTO de HTTP.
 */
type LoginInput = {
  email: string;
  password: string;
};

/**
 * Caso de uso de login.
 * Centraliza toda a regra de autenticação:
 * - Busca usuário
 * - Valida senha
 * - Gera token
 */
export const loginUseCase = async ({ email, password }: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // Regra de negócio: usuário precisa existir
  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const isMatch = await compareHash(password, user.password);

  // Regra de negócio: senha precisa ser válida
  if (!isMatch) {
    throw new Error("Credenciais inválidas");
  }

  // Token só é gerado após validação completa
  const token = generateToken(user);
  return token;
};
