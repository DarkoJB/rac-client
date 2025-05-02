import { FC } from "react";
import CarCard from "../CarCard/CarCard";
import { iCarModel } from "../../shared/interfaces";
import "./admin-car-card.css";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

const AdminCarCard: FC<{ car: iCarModel; handleDeleteCar: () => void }> = ({
  car,
  handleDeleteCar,
}) => {
  return (
    <div className="admin-car-card">
      <div className="admin-panel">
        <div className="admin-btns-wrapper">
          <button name="delete" onClick={handleDeleteCar}>
            <FaRegTrashAlt />
          </button>
          <button name="edit">
            <FaEdit />
          </button>
        </div>
        <h4>{car.owner?.username ?? "No owner"}</h4>
      </div>
      <CarCard car={car} />
    </div>
  );
};
export default AdminCarCard;
