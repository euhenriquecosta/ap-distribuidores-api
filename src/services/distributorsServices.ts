import { IDistributor } from "@/interfaces/distributorInterface";
import { createDistributors, findDistributor, listDistributors } from "../repositories/distributors/distributorsRepositories";

export const listDistributorsService = async () => {
  return listDistributors();
}

export const createDistributorsService = async (data: IDistributor) => {
  return createDistributors(data);
}

export const updateDistributorsService = async (id: number, data: any) => {
  // return updateDistributors(id, data);
}

export const deleteDistributorService = async (id: number) => {
  // return deleteDistributor(id);
}

export const findDistributorService = async (id: number) => {
  return findDistributor(id);
}

