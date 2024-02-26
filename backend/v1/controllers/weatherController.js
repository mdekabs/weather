import getWeatherData from ../WeatherService.js
export const fetchWeather = async (req, res) => {
  try {
    const { city } = req.params;
    const weatherData = await getWeatherData(city);
    res.json(weatherData);
    catch (error) {
      console.error("Error while fetching data:", error);
      res.status("500).json({error: "Failed to fetch weather data");
    }
  }
};
