import { FC } from "react";
import { iCarModel } from "../../shared/interfaces";
import useApi from "../../shared/useApi";
import { Link } from "react-router";
import "./car-card.css";
const CarCard: FC<{ car: iCarModel }> = ({ car }) => {
  const api = useApi();

  return (
    <div key={car._id} className="car-card">
      <img
        src={api + car.thumbnail}
        alt={car.model}
        className="car-image"
        loading="lazy"
        onError={(event) => {
          event.currentTarget.src = "/public/images/logo.webp";
        }}
      />
      <div className="car-info">
        <h3>{car.model}</h3>
        <span>({car.year})</span>
        <div className="car-specs">
          <span>{car.seats} seats</span>
          <span>${car.pricePerDay}/day</span>
        </div>
        <Link to={`/cars/${car._id}`} className="view-button">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
