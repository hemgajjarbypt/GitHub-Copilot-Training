import { config } from "./index.js";

// Mock dotenv
jest.mock("dotenv");

describe("Config", () => {
  beforeEach(() => {
    jest.resetModules();
    // Clear environment variables
    delete process.env.PORT;
    delete process.env.WEATHER_API_KEY;
  });

  it("should load default PORT if not set", () => {
    require("./index.js");
    expect(config.PORT).toBe(3000);
  });

  it("should load PORT from environment", () => {
    process.env.PORT = "5000";
    jest.resetModules();
    const { config: newConfig } = require("./index.js");
    expect(newConfig.PORT).toBe("5000");
  });

  it("should load WEATHER_API_KEY from environment", () => {
    process.env.WEATHER_API_KEY = "test_key";
    jest.resetModules();
    const { config: newConfig } = require("./index.js");
    expect(newConfig.WEATHER_API_KEY).toBe("test_key");
  });

  it("should have correct WEATHER_BASE_URL", () => {
    expect(config.WEATHER_BASE_URL).toBe("https://api.openweathermap.org/data/2.5/weather");
  });

  it("should handle undefined WEATHER_API_KEY", () => {
    require("./index.js");
    expect(config.WEATHER_API_KEY).toBeUndefined();
  });

  it("should handle numeric PORT", () => {
    process.env.PORT = "8080";
    jest.resetModules();
    const { config: newConfig } = require("./index.js");
    expect(newConfig.PORT).toBe("8080");
  });

  it("should handle empty string PORT", () => {
    process.env.PORT = "";
    jest.resetModules();
    const { config: newConfig } = require("./index.js");
    expect(newConfig.PORT).toBe(3000); // Default value when empty string
  });
});
