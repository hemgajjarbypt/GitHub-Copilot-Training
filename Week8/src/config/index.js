import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  WEATHER_BASE_URL: "https://api.openweathermap.org/data/2.5/weather",
};
