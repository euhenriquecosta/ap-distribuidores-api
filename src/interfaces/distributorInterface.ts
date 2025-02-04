import { PlanTypeEnum, RegionEnum } from "@prisma/client";
import { UUID } from "node:crypto";

export interface IDistributor {
  DISTRIBUTOR_ID: string;
  PLAN_TYPE: PlanTypeEnum; 
  ADDRESS: string;
  REGION: RegionEnum;
  POSTAL_CODE: string;
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