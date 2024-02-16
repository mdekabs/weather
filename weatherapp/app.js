
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

async function getWeatherData(city) {
    const apiKey = process.env.API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;

    try {
        const response = await fetch(weatherUrl);
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.log("Error fetching weather data:", error);
        throw error;
    }
}

app.get('/weather/:city', async (req, res) => {
    try {
        const city = req.params.city;
        const weatherData = await getWeatherData(city);
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
