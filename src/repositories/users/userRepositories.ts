import bcrypt from "bcrypt";
import { prisma } from "../../prisma/script";
import { hashPassword } from "@/utils/crypt";

export const listUsers = async () => {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    console.error("❌ Error listing users:", error);
    throw new Error(`Database error: ${error.message}`);
  }
};

export const createUser = async (data: { firstName: string; lastName: string; email: string; password: string }) => {
  try {
    const hashedPassword = await hashPassword(data.password);

    const newUser = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        passwordHash: hashedPassword,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw new Error("Erro ao criar usuário. Verifique os dados.");
  }
};

export const updateUser = async (id: number, data: any) => {
  return prisma.user.update({ where: { id }, data });
};

export const deleteUser = async (id: number) => {
  return prisma.user.delete({ where: { id } });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email: email
    }
  });
};