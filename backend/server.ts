import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import resumeRoutes from "./routes/resumeRoutes.ts";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/resume", resumeRoutes);
app.use("/api/analysis", analysisRoutes);
import analysisRoutes from "./routes/analysisRoutes";

app.get("/", (_req, res) => {
  res.send("AI Resume Analyzer Backend Running");
});

app.get("/api/test", (_req, res) => {
  res.json({
    message: "Backend Connected Successfully",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});