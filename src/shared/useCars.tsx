import { useEffect, useState } from "react";
import { iCarModel } from "./interfaces";
import CarsModel from "../models/models";

const useCars = (amount?: number): iCarModel[] => {
  const carsModel = new CarsModel();
  const [cars, setCars] = useState<iCarModel[]>([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async (): Promise<void> => {
    const carsResponse = await carsModel.getCars(amount);
    setCars(carsResponse);
  };

  return cars;
};

export default useCars;
