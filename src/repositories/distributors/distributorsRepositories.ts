import { prisma } from "../../prisma/script";

export const listDistributors = async () => {
  return prisma.distributor.findMany();
}

export const createDistributors = async (data: any) => {
  return prisma.distributor.create({ data });
}

export const updateDistributors = async (id: number, data: any) => {
  return prisma.distributor.update({ where: { id }, data });
}

export const deleteDistributor = async (id: number) => {
  return prisma.distributor.delete({ where: { id } });
}

export const findDistributor = async (id: number) => {
  return prisma.distributor.findUnique({ where: { id } });
}

export const findDistributorsByName = async (name: string) => {
  return prisma.distributor.findFirst({ where: {contactFirstName: name} });
}