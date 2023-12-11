import axios from "axios";

export const getElevatorStatus = async () => {
    try {
      return await axios.get("https://fe20262a-7b4f-4c51-a4e8-ea72cd87ab60.mock.pstmn.io/api/lift/status");

    } catch (error) {
      console.error("Error fetching data:", error);
    }
}