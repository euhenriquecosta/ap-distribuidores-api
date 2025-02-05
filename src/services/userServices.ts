import { createUser, getUserByEmail, getUserById, listUsers, updateUserPhoto } from "../repositories/users/userRepositories";

export const listUserService = async () => {
  return listUsers();
}

export const createUserService = async (user: any) => {
  return createUser(user);
}

export const getUserByEmailService = async (email: string) => {
  return getUserByEmail(email);
}

export const getUserByIdService = async (id: string) => {
  return getUserById(id);
}

export const updateUserPhotoService = async (id: string, photo: string) => {
  return updateUserPhoto(id, photo);
}