import request from "supertest";
import express from "express";
import weatherRoute from "./weather.js";
import { getWeather } from "../services/weatherService.js";

// Mock the weatherService
jest.mock("../services/weatherService.js");

const app = express();
app.use("/weather", weatherRoute);

describe("Weather Route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return weather data for a valid city", async () => {
    const mockData = {
      city: "London",
      temp: 15,
      condition: "clear sky",
    };
    getWeather.mockResolvedValue(mockData);

    const response = await request(app).get("/weather?city=London");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
    expect(getWeather).toHaveBeenCalledWith("London");
  });

  it("should return 400 if city is not provided", async () => {
    const response = await request(app).get("/weather");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "City is required" });
  });

  it("should return 500 if getWeather throws an error", async () => {
    getWeather.mockRejectedValue(new Error("API Error"));

    const response = await request(app).get("/weather?city=InvalidCity");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "API Error" });
    expect(getWeather).toHaveBeenCalledWith("InvalidCity");
  });

  it("should handle case insensitive city names", async () => {
    const mockData = {
      city: "london",
      temp: 15,
      condition: "clear sky",
    };
    getWeather.mockResolvedValue(mockData);

    const response = await request(app).get("/weather?city=london");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
    expect(getWeather).toHaveBeenCalledWith("london");
  });

  it("should handle cities with spaces", async () => {
    const mockData = {
      city: "New York",
      temp: 20,
      condition: "partly cloudy",
    };
    getWeather.mockResolvedValue(mockData);

    const response = await request(app).get("/weather?city=New%20York");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
    expect(getWeather).toHaveBeenCalledWith("New York");
  });

  it("should handle empty city parameter", async () => {
    const response = await request(app).get("/weather?city=");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "City is required" });
  });

  it("should handle multiple query parameters", async () => {
    const mockData = {
      city: "Paris",
      temp: 18,
      condition: "rainy",
    };
    getWeather.mockResolvedValue(mockData);

    const response = await request(app).get("/weather?city=Paris&other=param");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
    expect(getWeather).toHaveBeenCalledWith("Paris");
  });
});
