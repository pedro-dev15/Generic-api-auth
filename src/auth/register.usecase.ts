import { getHash } from "../infra/crypto/bcrypt";
import { prisma } from "../lib/prisma";

/**
 * Input de domínio do caso de uso de registro.
 * Independente de HTTP ou Express.
 */
type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

/**
 * Caso de uso responsável pela regra de negócio do registro.
 * - Gera hash da senha
 * - Persiste o usuário no banco
 *
 * Não conhece req/res.
 */
export const registerUseCase = async ({
  password,
  name,
  email,
}: RegisterInput) => {
  const hash: string = await getHash(password);

  const user = await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: hash,
    },
  });

  return user;
};
