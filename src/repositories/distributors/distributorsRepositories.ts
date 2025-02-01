import { IDistributor } from "../../interfaces/distributorInterface";
import { prisma } from "../../prisma/script";

export const listDistributors = async () => {
  try {
    return await prisma.distributor.findMany();
  } catch (error) {
    console.error("❌ Error listing users:", error);
    throw new Error(`Database error: ${error.message}`);
  }
}

export const createDistributors = async (data: IDistributor) => {
  return prisma.distributor.create({ 
    data: {
      userId: data.userId,
      contactFirstName: data.contactFirstName,
      contactLastName: data.contactLastName,
      contactEmail: data.contactEmail,
      phoneNumber: data.phoneNumber,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      postalCode: data.postalCode,
      region: data.region,
      whatsappNumber: data.whatsappNumber,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
   });
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