import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { iCarModel, iCarsContextValue } from "../shared/interfaces";
import CarsModel from "../models/CarsModel";

export const CarsContext = createContext<iCarsContextValue | undefined>(
  undefined,
);

const CarsProvider: FC<{ children: ReactNode; amount?: number }> = ({
  children,
  amount,
}) => {
  const [cars, setCars] = useState<iCarModel[]>([]);
  const [currentAmount, setCurrentAmount] = useState<number | undefined>(
    amount,
  );

  const carsModel = new CarsModel();

  const fetchCars = useCallback(
    async (newAmount?: number): Promise<void> => {
      const finalAmount = newAmount ?? currentAmount;
      const carsResponse = await carsModel.getCars(finalAmount);
      setCars(carsResponse);
    },
    [currentAmount],
  );

  useEffect(() => {
    setCurrentAmount(amount); // sync internal amount when prop changes
    fetchCars(amount);
  }, [amount, fetchCars]);

  return (
    <CarsContext.Provider
      value={{
        cars,
        refreshCars: (amount) => fetchCars(amount),
      }}
    >
      {children}
    </CarsContext.Provider>
  );
};

export default CarsProvider;
