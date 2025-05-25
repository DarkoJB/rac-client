import { FC, useMemo } from "react";
import { iCarModel } from "../../shared/interfaces";
import { Link } from "react-router";
import "./car-card.css";
import { toBase64 } from "../../utils/toBase64";
const CarCard: FC<{ car: iCarModel }> = ({ car }) => {
  const base64 = useMemo(() => {
    if (car.thumbnail) return toBase64(car.thumbnail.data);
    return "";
  }, [car.thumbnail]);

  const imgSrc =
    car.thumbnail && base64
      ? `data:${car.thumbnail.contentType};base64,${base64}`
      : "/images/logo.webp";

  return (
    <div key={car._id} className="car-card">
      <img
        src={imgSrc}
        alt={car.model}
        className="car-image"
        loading="lazy"
        onError={(event) => {
          event.currentTarget.src = "/images/logo.webp";
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
