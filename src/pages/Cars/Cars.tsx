import { FC } from "react";
import "./cars.css";
import useCars from "../../shared/useCars";
import CarCard from "../../components/CarCard/CarCard";

const Cars: FC = () => {
  const cars = useCars();
  return (
    <div className="page-container">
      <section className="cars-hero">
        <div className="cars-hero-content">
          <h1>Our Fleet</h1>
          <p>Premium station wagons ready for your next adventure</p>
        </div>
      </section>

      <section className="cars-list">
        <h2>Choose Your Wagon</h2>
        <div className="car-grid">
          {cars.map((car) => (
            <CarCard car={car} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Cars;
