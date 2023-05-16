import express from "express";
import ClimateController from "../controllers/climateControllers";


const router = express.Router();

router
  .get("/temperature", ClimateController.fetchTemperatureData);

export default router;