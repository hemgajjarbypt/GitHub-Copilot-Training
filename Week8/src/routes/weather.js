import express from "express";
import { getWeather } from "../services/weatherService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) return res.status(400).json({ error: "City is required" });

    const data = await getWeather(city);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
