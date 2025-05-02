import { useContext, useEffect } from "react";
import { iCarsContextValue } from "../shared/interfaces";
import { CarsContext } from "../contexts/CarsContext";

const useCars = (amount?: number): iCarsContextValue => {
  const context = useContext(CarsContext);

  if (!context) {
    throw new Error("useCars must be used withing a CarsProvider");
  }

  useEffect(() => {
    if (amount !== undefined) {
      context.refreshCars(amount);
    }
  }, [amount]);

  return context;
};

export default useCars;
