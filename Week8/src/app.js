// app.js - Main entry point for the Express server

/**
 * Main Express server setup.
 * - Imports Express and weather route.
 * - Initializes app and mounts routes.
 * - Starts server unless in test environment.
 */
import express from "express";
import weatherRoute from "./routes/weather.js";
import { config } from "./config/index.js";

// Initialize Express app
const app = express();

// Mount weather route at /weather endpoint
app.use("/weather", weatherRoute);

// Start server unless in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.PORT, () =>
    console.log(`Server running on http://localhost:${config.PORT}`)
  );
}

export default app; // Export app for testing or further use
