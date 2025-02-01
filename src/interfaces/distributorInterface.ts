
export interface IDistributor {
  id: number;
  userId: number;
  address: string;
  region: string;
  postalCode: string;
  longitude: number;
  latitude: number;
  whatsappNumber: string;
  phoneNumber?: string;
  contactEmail: string;
  contactFirstName: string;
  contactLastName: string;
  createdAt: Date;
  updatedAt: Date;
}