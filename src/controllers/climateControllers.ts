import axios from "axios";

class ClimateController {

  static fetchTemperatureData = async () => {
    try {
      const response = await axios.get("https://api.example.com/temperatureData"); // Substitua pelo URL real da API.
      return response.data; 
    } catch (error) {
      console.error(`Failed to fetch temperature data: ${error}`);
      throw error;
    }
  };

}

export default ClimateController;
