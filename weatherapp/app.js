const fetch = require("node-fetch");

async function getweatherData(city) {
  const apiKey = "8cd550756d5927c9d1f035776e347da9";
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;
  try {
    const response = await fetch(weatherUrl);
    const weatherData = await response.json();
    return weatherData;
  }
  catch (error) {
    console.log("error fetching weather data:", error);
    throw error;
  }
}

getweatherData("Lagos")
.then((data) => {
  console.log(data);
})
.catch((error) => {
  console.error(error);
});
