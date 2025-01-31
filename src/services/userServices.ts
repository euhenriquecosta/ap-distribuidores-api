import { createUser, getUserByEmail, listUsers } from "../repositories/users/userRepositories";

export const listUserService = async () => {
  return listUsers();
}

export const createUserService = async (user: any) => {
  return createUser(user);
}

export const getUserByEmailService = async (email: string) => {
  return getUserByEmail(email);
}