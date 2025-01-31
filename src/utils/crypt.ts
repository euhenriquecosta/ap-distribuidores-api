import * as bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  const hashPassword = await bcrypt.hash(password, saltRounds);
  return hashPassword;
};

export const comparePassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hashPassword);
  return isMatch;
};
