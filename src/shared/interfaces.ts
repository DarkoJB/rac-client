// Users

export interface iUserModel {
  createdAt: Date;
  email: string;
  role: UserRoleType;
  username: string;
  _id: string;
}

export enum UserRoleType {
  ADMIN = "admin",
  RENTER = "renter",
  OWNER = "owner",
}

// Cars

export interface iCarModel {
  images: Array<string>;
  model: string;
  owner: iUserModel["_id"] | null;
  pricePerDay: number;
  seats: number;
  year: number;
  _id: string;
}
