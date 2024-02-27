import { getWeatherData } from '../service/weatherService.js';
import { handleResponse } from "../utility/handleResponse.js";

/**
 * Fetches weather data for a specified city.
 * @async
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} Does not return a value. Sends a response with weather data or an error message.
 */
export const fetchWeather = async (req, res) => {
  try {
    const { city } = req.params;
    const weatherData = await getWeatherData(city);
    // Using handleResponse to send the weather data
    handleResponse(res,   200, weatherData);
  } catch (error) {
    // Logging the error for debugging purposes
    console.error("Error while fetching data:", error);
    // Using handleResponse to send an error response
    handleResponse(res,   500, { error: "Failed to fetch weather data" });
  }
};
