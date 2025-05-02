export type ToastType = "success" | "error" | "warn" | "info";

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

export interface iCarsContextValue {
  cars: iCarModel[];
  refreshCars: (amount?: number) => Promise<void>;
}

export interface iCarModel {
  images?: Array<string>;
  model: string;
  owner?: { _id?: iUserModel["_id"]; username?: iUserModel["username"] } | null;
  pricePerDay: number;
  seats: number;
  year: number;
  _id?: string;
  thumbnail?: string;
}

export interface AddCarForm {
  model: string;
  year: number;
  seats: number;
  pricePerDay: number;
  owner?: string;
  images?: FileList | File[];
}
