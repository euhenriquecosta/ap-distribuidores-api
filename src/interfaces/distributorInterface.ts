
export interface IDistributor {
  id: number;
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
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}