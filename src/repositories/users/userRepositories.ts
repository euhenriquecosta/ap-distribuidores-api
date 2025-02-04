import bcrypt from "bcrypt";
import { prisma } from "../../prisma/script";
import { hashPassword } from "../../utils/crypt";
import { UUID } from "node:crypto";
import { CreateUserRequestBody } from "../../interfaces/userInterface";

export const listUsers = async () => {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    console.error("❌ Error listing users:", error);
    throw new Error(`Database error: ${error}`);
  }
};

export const createUser = async (data: CreateUserRequestBody) => {
  try {
    const hashedPassword = await hashPassword(data.PASSWORD);

    const newUser = await prisma.user.create({
      data: {
        FIRST_NAME: data.FIRST_NAME,
        LAST_NAME: data.LAST_NAME,
        EMAIL: data.EMAIL,
        PASSWORD: hashedPassword,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw new Error("Erro ao criar usuário. Verifique os dados.");
  }
};

export const updateUser = async (id: UUID, data: any) => {
  return prisma.user.update({ where: { USER_ID: id }, data });
};

export const deleteUser = async (id: UUID) => {
  return prisma.user.delete({ where: { USER_ID: id } });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      EMAIL: email
    }
  });
};