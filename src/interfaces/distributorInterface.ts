import { PlanTypeEnum } from "@prisma/client";

export interface IDistributor {
  DISTRIBUTOR_ID: string;
  PLAN_TYPE: PlanTypeEnum; 
  ADDRESS: string;
  LONGITUDE: number;
  LATITUDE: number;
  WHATSAPP_NUMBER: string;
  PHONE_NUMBER: string;
  EMAIL: string;
  FIRST_NAME: string;
  LAST_NAME: string;
  CREATED_AT: Date;
  UPDATED_AT: Date;
}