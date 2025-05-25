import { useContext, useEffect } from "react";
import { iCarsContextValue } from "../shared/interfaces";
import { CarsContext } from "../contexts/CarsContext";
import { LoaderContext } from "../contexts/LoaderContext";

const useCars = (amount?: number): iCarsContextValue => {
  const carsContext = useContext(CarsContext);
  const loader = useContext(LoaderContext);

  if (!carsContext) {
    throw new Error("useCars must be used withing a CarsProvider");
  }

  useEffect(() => {
    const fetchCars = async () => {
      if (amount !== undefined) {
        try {
          loader.setIsLoading(true);
          await carsContext.refreshCars(amount);
        } finally {
          loader.setIsLoading(false);
        }
      }
    };

    fetchCars();
  }, [amount]);

  return carsContext;
};

export default useCars;
