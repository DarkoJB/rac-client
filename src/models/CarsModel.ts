import axios from "axios";
import { CarForm, iCarModel } from "../shared/interfaces";
import useApi from "../hooks/useApi";

class CarsModel {
  constructor() {}
  adminApi = useApi();
  getCars = async (amount?: number): Promise<iCarModel[]> => {
    try {
      const response = await axios.get<iCarModel[]>(
        `${this.adminApi}/api/cars`,
        {
          params: { limit: amount },
        },
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching cars:", error);
      throw new Error("Failed to fetch cars.");
    }
  };

  addCar = async (newCar: CarForm): Promise<iCarModel> => {
    try {
      const formData = new FormData();

      // Append all image files
      if (newCar.images) {
        Array.from(newCar.images).forEach((file) => {
          formData.append("images", file); // Use "images" to match your backend
        });
      }

      formData.append("model", newCar.model);
      formData.append("year", String(newCar.year));
      formData.append("seats", String(newCar.seats));
      formData.append("pricePerDay", String(newCar.pricePerDay));
      if (newCar.owner) formData.append("owner", newCar.owner);

      const response = await axios.post(`${this.adminApi}/api/cars`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error adding a new car", error);
      throw new Error("Error adding a new car");
    }
  };

  deleteCar = async (id?: string): Promise<iCarModel> => {
    try {
      const response = await axios.delete(`${this.adminApi}/api/cars/${id}`);
      return response.data;
    } catch (error) {
      const errorMessage = "Error deleting a car";
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  updateCar = async (carId: string, newCar: CarForm): Promise<iCarModel> => {
    try {
      const formData = new FormData();

      // Append all image files
      if (newCar.images) {
        Array.from(newCar.images).forEach((file) => {
          formData.append("images", file); // Use "images" to match your backend
        });
      }

      formData.append("model", newCar.model);
      formData.append("year", String(newCar.year));
      formData.append("seats", String(newCar.seats));
      formData.append("pricePerDay", String(newCar.pricePerDay));
      formData.append("retainImageIds", JSON.stringify(newCar.retainImageIds));
      if (newCar.owner) formData.append("owner", newCar.owner);

      const response = await axios.patch(
        `${this.adminApi}/api/cars/${carId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response.data;
    } catch (error) {
      const errorMessage = "Error updating a car";
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  };
}

export default CarsModel;
