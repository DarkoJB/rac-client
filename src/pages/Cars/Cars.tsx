import { FC, useEffect, useState } from "react";
import "./cars.css";
import useCars from "../../hooks/useCars";
import CarCard from "../../components/CarCard/CarCard";
import { iCarModel } from "../../shared/interfaces";
import SearchCars from "../../components/SearchCars/SearchCars";
import useLoader from "../../hooks/useLoader";

const Cars: FC = () => {
  const existingCars = useCars();
  const loader = useLoader();

  const [cars, setCars] = useState<iCarModel[]>([]);

  useEffect(() => {
    setCars(existingCars.cars);
  }, [existingCars]);

  return (
    <div className="page-container">
      <section className="cars-hero">
        <div className="cars-hero-content">
          <h1>Our Fleet</h1>
          <p>Premium station wagons ready for your next adventure</p>
        </div>
      </section>

      <section className="cars-list">
        <div className="title-search-wrapper">
          <h2>Choose Your Wagon</h2>
          <SearchCars loader={loader} />
        </div>
        <div className="car-grid">
          {cars.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Cars;
