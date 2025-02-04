import { UUID } from "node:crypto";
import { IDistributor } from "../../interfaces/distributorInterface";
import { prisma } from "../../prisma/script";
import { RegionEnum } from "@prisma/client";

export const listDistributors = async () => {
  try {
    return await prisma.distributor.findMany();
  } catch (error) {
    console.error("❌ Error listing distributors:", error);
    throw new Error(`Database error: ${error.message}`);
  }
}

export const createDistributors = async (data: IDistributor ) => {
  return prisma.distributor.create({ 
    data: {
      DISTRIBUTOR_ID: data.DISTRIBUTOR_ID,
      FIRST_NAME: data.FIRST_NAME,
      LAST_NAME: data.LAST_NAME,
      EMAIL: data.EMAIL,
      PHONE_NUMBER: data.PHONE_NUMBER,
      ADDRESS: data.ADDRESS,
      LATITUDE: data.LATITUDE,
      LONGITUDE: data.LONGITUDE,
      POSTAL_CODE: data.POSTAL_CODE,
      REGION: data.REGION,
      WHATSAPP_NUMBER: data.WHATSAPP_NUMBER,
      PLAN_TYPE: data.PLAN_TYPE,
      CREATED_AT: new Date(),
      UPDATED_AT: new Date(),
    }
   });
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