import { IDistributor } from "../../interfaces/distributorInterface";
import { prisma } from "../../prisma/script";

export const listDistributors = async () => {
  try {
    return await prisma.distributor.findMany();
  } catch (error) {
    console.error("❌ Error listing distributors:", error);
    throw new Error(`Database error: ${error}`);
  }
}

export const createDistributors = async (data: IDistributor ) => {
  try {
    return prisma.distributor.create({ 
      data: {
        PLAN_TYPE: data.PLAN_TYPE,
        FIRST_NAME: data.FIRST_NAME,
        LAST_NAME: data.LAST_NAME,
        EMAIL: data.EMAIL,
        PHONE_NUMBER: data.PHONE_NUMBER,
        ADDRESS: data.ADDRESS,
        LATITUDE: data.LATITUDE,
        LONGITUDE: data.LONGITUDE,
        WHATSAPP_NUMBER: data.WHATSAPP_NUMBER,
        CREATED_AT: new Date(),
        UPDATED_AT: new Date(),
        AVATAR: null
      }
    });
  } catch (error) {
    console.error("❌ Erro ao criar o distribuidor:", error);
    throw new Error(`Database error: ${error}`);
   }
}

export const updateDistributors = async (id: string, data: any) => {
  return prisma.distributor.update({ where: { DISTRIBUTOR_ID: id }, data });
}

export const deleteDistributor = async (id: string) => {
  return prisma.distributor.delete({ where: { DISTRIBUTOR_ID: id } });
}

export const findDistributor = async (id: string) => {    
  return prisma.distributor.findUnique({ where: { DISTRIBUTOR_ID: id } });
}

export const findDistributorsByName = async (name: string) => {
  return prisma.distributor.findFirst({ where: {FIRST_NAME: name} });
}

export const updateDistributorPhoto = async (id: string, photo: string) => {
  return prisma.distributor.update({ 
    where: { 
      DISTRIBUTOR_ID: id 
    },
    data: {
      AVATAR: photo
    } 
  });
}