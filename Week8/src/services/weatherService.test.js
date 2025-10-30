import axios from "axios";
import { getWeather } from "./weatherService.js";
import { getCache, setCache } from "../utils/cache.js";

// Mock axios and cache utilities
jest.mock("axios");
jest.mock("../utils/cache.js");

describe("Weather Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return cached data if available", async () => {
    const cachedData = {
      city: "London",
      temp: 15,
      condition: "clear sky",
    };
    getCache.mockReturnValue(cachedData);

    const result = await getWeather("London");

    expect(result).toEqual(cachedData);
    expect(getCache).toHaveBeenCalledWith("weather_london");
    expect(axios.get).not.toHaveBeenCalled();
    expect(setCache).not.toHaveBeenCalled();
  });

  it("should fetch data from API if not cached", async () => {
    getCache.mockReturnValue(null);
    const mockApiResponse = {
      data: {
        name: "London",
        main: { temp: 15 },
        weather: [{ description: "clear sky" }],
      },
    };
    axios.get.mockResolvedValue(mockApiResponse);

    const result = await getWeather("London");

    expect(result).toEqual({
      city: "London",
      temp: 15,
      condition: "clear sky",
    });
    expect(getCache).toHaveBeenCalledWith("weather_london");
    expect(axios.get).toHaveBeenCalledWith("https://api.openweathermap.org/data/2.5/weather", {
      params: { q: "London", appid: expect.any(String), units: "metric" },
    });
    expect(setCache).toHaveBeenCalledWith("weather_london", {
      city: "London",
      temp: 15,
      condition: "clear sky",
    });
  });

  it("should handle API errors", async () => {
    getCache.mockReturnValue(null);
    axios.get.mockRejectedValue(new Error("API Error"));

    await expect(getWeather("InvalidCity")).rejects.toThrow("API Error");
    expect(getCache).toHaveBeenCalledWith("weather_invalidcity");
    expect(axios.get).toHaveBeenCalledWith("https://api.openweathermap.org/data/2.5/weather", {
      params: { q: "InvalidCity", appid: expect.any(String), units: "metric" },
    });
    expect(setCache).not.toHaveBeenCalled();
  });

  it("should normalize city name to lowercase for cache key", async () => {
    getCache.mockReturnValue(null);
    const mockApiResponse = {
      data: {
        name: "New York",
        main: { temp: 20 },
        weather: [{ description: "partly cloudy" }],
      },
    };
    axios.get.mockResolvedValue(mockApiResponse);

    const result = await getWeather("New York");

    expect(result).toEqual({
      city: "New York",
      temp: 20,
      condition: "partly cloudy",
    });
    expect(getCache).toHaveBeenCalledWith("weather_new york");
    expect(setCache).toHaveBeenCalledWith("weather_new york", {
      city: "New York",
      temp: 20,
      condition: "partly cloudy",
    });
  });

  it("should handle cities with special characters", async () => {
    getCache.mockReturnValue(null);
    const mockApiResponse = {
      data: {
        name: "São Paulo",
        main: { temp: 25 },
        weather: [{ description: "sunny" }],
      },
    };
    axios.get.mockResolvedValue(mockApiResponse);

    const result = await getWeather("São Paulo");

    expect(result).toEqual({
      city: "São Paulo",
      temp: 25,
      condition: "sunny",
    });
    expect(getCache).toHaveBeenCalledWith("weather_são paulo");
    expect(setCache).toHaveBeenCalledWith("weather_são paulo", {
      city: "São Paulo",
      temp: 25,
      condition: "sunny",
    });
  });

  it("should handle empty city string", async () => {
    getCache.mockReturnValue(null);
    const mockApiResponse = {
      data: {
        name: "",
        main: { temp: 0 },
        weather: [{ description: "" }],
      },
    };
    axios.get.mockResolvedValue(mockApiResponse);

    const result = await getWeather("");

    expect(result).toEqual({
      city: "",
      temp: 0,
      condition: "",
    });
    expect(getCache).toHaveBeenCalledWith("weather_");
    expect(setCache).toHaveBeenCalledWith("weather_", {
      city: "",
      temp: 0,
      condition: "",
    });
  });

  it("should handle API response with missing fields", async () => {
    getCache.mockReturnValue(null);
    const mockApiResponse = {
      data: {
        name: "London",
        main: {},
        weather: [],
      },
    };
    axios.get.mockResolvedValue(mockApiResponse);

    const result = await getWeather("London");

    expect(result).toEqual({
      city: "London",
      temp: undefined,
      condition: undefined,
    });
    expect(setCache).toHaveBeenCalledWith("weather_london", {
      city: "London",
      temp: undefined,
      condition: undefined,
    });
  });

  it("should handle API response with missing weather array", async () => {
    getCache.mockReturnValue(null);
    const mockApiResponse = {
      data: {
        name: "London",
        main: { temp: 15 },
        weather: [],
      },
    };
    axios.get.mockResolvedValue(mockApiResponse);

    const result = await getWeather("London");

    expect(result).toEqual({
      city: "London",
      temp: 15,
      condition: undefined,
    });
    expect(setCache).toHaveBeenCalledWith("weather_london", {
      city: "London",
      temp: 15,
      condition: undefined,
    });
  });
});
