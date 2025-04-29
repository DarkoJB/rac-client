import { FC } from "react";
import "./cars.css";
import { Link } from "react-router-dom";

const availableCars = [
  {
    id: 1,
    model: "Volvo V90",
    price: 80,
    seats: 5,
    image: "/images/volvo-v90.webp",
    year: 2022,
  },
  {
    id: 2,
    model: "VW Passat",
    price: 65,
    seats: 5,
    image: "/images/vw-passat.webp",
    year: 2021,
  },
  {
    id: 3,
    model: "Audi A6 Avant",
    price: 90,
    seats: 5,
    image: "/images/audi-a6-avant.webp",
    year: 2023,
  },
  {
    id: 4,
    model: "Mercedes E-Class Wagon",
    price: 95,
    seats: 5,
    image: "/images/mercedes-eclass.webp",
    year: 2023,
  },
  {
    id: 5,
    model: "BMW 5 Series Touring",
    price: 88,
    seats: 5,
    image: "/images/mercedes-eclass.webp",
    year: 2023,
  },
];

const Cars: FC = () => {
  return (
    <div className="cars-container">
      <section className="cars-hero">
        <div className="cars-hero-content">
          <h1>Our Fleet</h1>
          <p>Premium station wagons ready for your next adventure</p>
        </div>
      </section>

      <section className="cars-list">
        <h2>Choose Your Wagon</h2>
        <div className="car-grid">
          {availableCars.map((car) => (
            <div key={car.id} className="car-card">
              <img
                src={car.image}
                alt={car.model}
                className="car-image"
                loading="lazy"
              />
              <div className="car-info">
                <h3>
                  {car.model} <span>({car.year})</span>
                </h3>
                <div className="car-specs">
                  <span>{car.seats} seats</span>
                  <span>${car.price}/day</span>
                </div>
                <Link to={`/cars/${car.id}`} className="view-button">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Cars;
