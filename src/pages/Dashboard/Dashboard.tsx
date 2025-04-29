import { FC, useEffect, useState } from "react";
import "./dashboard.css";
import axios from "axios";
import { iCarModel } from "../../shared/interfaces";
import CarsModel from "../../models/Cars";
import useCars from "../../shared/useCars";

const Dashboard: FC = () => {
  const [cars, setCars] = useState<iCarModel[]>(useCars());

  const carsModel = new CarsModel();
  const [newCar, setNewCar] = useState({
    model: "",
    year: "",
    seats: "",
    pricePerDay: "",
    owner: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // const existingCars = useCars() ;
    // setNewCar(existingCars);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCar({ ...newCar, [event.target.name]: event.target.value });
  };

  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<iCarModel>(
        `${import.meta.env.VITE_API}/api/cars`,
        {
          model: newCar.model,
          year: parseInt(newCar.year),
          seats: parseInt(newCar.seats),
          pricePerDay: parseFloat(newCar.pricePerDay),
          owner: newCar.owner || undefined,
        },
      );

      setCars((prev) => [...prev, response.data]);
      setNewCar({ model: "", year: "", seats: "", pricePerDay: "", owner: "" });
      setError("");
    } catch (err) {
      setError("Failed to add new car.");
    }
  };

  return (
    <div className="dashboard-container">
      <section className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Manage your fleet easily</p>
      </section>

      <section className="add-car-form">
        <h2>Add New Car</h2>
        <form onSubmit={handleAddCar}>
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={newCar.model}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={newCar.year}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="seats"
            placeholder="Seats"
            value={newCar.seats}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="pricePerDay"
            placeholder="Price per day"
            value={newCar.pricePerDay}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="owner"
            placeholder="Owner (optional)"
            value={newCar.owner}
            onChange={handleInputChange}
          />
          <button type="submit" className="submit-button">
            Add Car
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </section>

      <section className="car-list">
        <h2>Existing Cars</h2>
        {isLoading ? (
          <p>Loading cars...</p>
        ) : (
          <div className="car-grid">
            {cars.map((car) => (
              <div key={car._id} className="car-card">
                <h3>
                  {car.model} ({car.year})
                </h3>
                <p>{car.seats} seats</p>
                <p>${car.pricePerDay}/day</p>
                {car.owner && <p className="owner-tag">Owner: {car.owner}</p>}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
