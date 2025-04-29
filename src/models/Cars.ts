import axios from "axios";
import { iCarModel } from "../shared/interfaces";

class CarsModel {
  constructor() {}

  async getCars(amount?: number): Promise<iCarModel[]> {
    try {
      const response = await axios.get<iCarModel[]>(
        `${import.meta.env.VITE_API}/api/cars`,
        {
          params: { limit: amount },
        },
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching cars:", error);
      throw new Error("Failed to fetch cars.");
    }
  }
}

export default CarsModel;
