import axios from "axios";
import { config } from "../config/index.js";
import { getCache, setCache } from "../utils/cache.js";

export const getWeather = async (city) => {
  const cacheKey = `weather_${city.toLowerCase()}`;
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  const response = await axios.get(config.WEATHER_BASE_URL, {
    params: { q: city, appid: config.WEATHER_API_KEY, units: "metric" },
  });

  const data = {
    city: response.data.name,
    temp: response.data.main.temp,
    condition: response.data.weather[0]?.description,
  };

  setCache(cacheKey, data);
  return data;
};
