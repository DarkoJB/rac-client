import axios from "axios";
import { iUserModel } from "../shared/interfaces";
import useApi from "../hooks/useApi";

class UsersModel {
  constructor() {}
  adminApi = useApi();

  getSingleUser = async (id: string): Promise<iUserModel> => {
    try {
      const response = await axios.get<iUserModel>(
        `${this.adminApi}/api/users/${id}`,
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching cars:", error);
      throw new Error("Failed to fetch cars.");
    }
  };
}

export default UsersModel;
