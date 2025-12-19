import { compareHash } from "../infra/crypto/bcrypt.ts";
import { prisma } from "../lib/prisma.ts";
import { generateToken } from "../infra/token/JWT.ts";

type LoginInput = {
  email: string;
  password: string;
};

export const loginUseCase = async ({ email, password }: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const isMatch = await compareHash(password, user.password);

  if (!isMatch) {
    throw new Error("Credenciais inválidas");
  }

  const token = generateToken(user);
  return token;
};
