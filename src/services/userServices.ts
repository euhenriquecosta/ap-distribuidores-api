import { createUser, getUserByEmail, getUserById, listUsers, updatePhoto } from "../repositories/users/userRepositories";

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

export const updatePhotoService = async (id: string, photo: string) => {
  return updatePhoto(id, photo);
}