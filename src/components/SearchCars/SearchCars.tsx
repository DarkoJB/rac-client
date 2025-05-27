import { FC, useContext, useMemo, useRef, useState } from "react";
import CarsModel from "../../models/CarsModel";
import { CarsContext } from "../../contexts/CarsContext";
import { toast } from "../../utils/toast";
import { debounce } from "../../utils/debounce";

const SearchCars: FC<{ loader: (load: boolean) => void }> = ({ loader }) => {
  const carsModel = new CarsModel();
  const carsContext = useContext(CarsContext);
  const searchCarsRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  // Memoize the debounced search function
  const debouncedSearch = useMemo(() => {
    return debounce(async (value: string) => {
      try {
        loader(true);
        const results = await carsModel.searchCars(value);
        carsContext?.setCars(results);
      } catch (error) {
        toast.error("Error searching for cars");
      } finally {
        loader(false);
      }
    }, 400);
  }, [carsContext]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="Search cars"
      value={query}
      onChange={handleChange}
      ref={searchCarsRef}
    />
  );
};

export default SearchCars;
