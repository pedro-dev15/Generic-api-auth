import { getHash } from "../infra/crypto/bcrypt";
import { prisma } from "../lib/prisma";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

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
