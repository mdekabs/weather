
import axios from "axios";

// Define constants
const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

/**
 * Fetches the current weather data for a specified city.
 * @async
 * @param {string} city - The name of the city.
 * @returns {Promise<Object>} The current weather data for the specified city.
 * @throws {Error} If there is an error fetching the data.
 */
export const getWeatherData = async (city) => {
  try {
    const apiUrl = `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error encountered while fetching data:", error);
    throw error;
  }
};

/**
 * Fetches the weather forecast for a specified city.
 * @async
 * @param {string} city - The name of the city.
 * @returns {Promise<Object>} The weather forecast data for the specified city.
 * @throws {Error} If there is an error fetching the forecast.
 */
export const getWeatherForecast = async (city) => {
  try {
    const apiUrl = `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error getting forecast:", error);
    throw error;
  }
};
