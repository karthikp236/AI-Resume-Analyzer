import express from "express";
import {
  getHistory,
  deleteHistory,
} from "../controllers/analysisController";

const router = express.Router();

router.get("/history", getHistory);

router.delete(
  "/history/:id",
  deleteHistory
);

export default router;