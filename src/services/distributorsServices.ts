import { IDistributor } from "../interfaces/distributorInterface";
import { createDistributors, deleteDistributor, findDistributor, findNearbyDistributors, getDistributorAvatar, listDistributors, updateDistributorPhoto, updateDistributors } from "../repositories/distributors/distributorsRepositories";

export const listDistributorsService = async () => {
  return listDistributors();
}

export const createDistributorsService = async (data: IDistributor) => {
  return createDistributors(data);
}

export const updateDistributorsService = async (id: string, data: IDistributor) => {
  return updateDistributors(id, data);
}

export const deleteDistributorService = async (id: string) => {
  return deleteDistributor(id);
}

export const findDistributorService = async (id: string) => {
  return findDistributor(id);
}

export const updateDistributorPhotoService = async (id: string, photo: string) => {
  return updateDistributorPhoto(id, photo);
}

export const getDistributorAvatarService = async (id: string) => {
  return getDistributorAvatar(id)
}

export const findNearbyDistributorsService = async (userCoordinates: { latitude: number, longitude: number }, range: number) => {
  return findNearbyDistributors(userCoordinates, range);
}