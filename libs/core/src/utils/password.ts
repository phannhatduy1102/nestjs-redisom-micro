import { compare, genSalt, hash } from 'bcrypt';

export const hashPassword = async (password: string) => {
  const salt = await genSalt();
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};

export const validatePassword = async (password: string, hash: string) => {
  return await compare(password, hash);
};
