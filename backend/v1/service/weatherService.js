import axios from "axios";
const API_KEY = process.env.API_KEY;

export const getWeatherData = async (city) => {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await axios.get(apiUrl);
    return response.data;

  }
  catch (error) {
    console.error("Error encountered while fetching data:", error);
    throw error;
  }
};

export const getWeatherForecast = async (city) => {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await axios.get(apiUrl);
    return response.data;
  }
  catch (error) {
    console.error("Error getting forecast:", error);
    throw error;
  }
};


