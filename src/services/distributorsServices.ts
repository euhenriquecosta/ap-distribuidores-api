import { listDistributors } from "../repositories/distributors/distributorsRepositories";

export const listDistributorsService = async () => {
  return listDistributors();
}