import express from "express";
import cors from "cors";
import saveRouter from "./routers/save_router.js";
import fetchRouter from "./routers/fetch_router.js";
import data from "./data.js";

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use("/save", saveRouter);
app.use("/fetch", fetchRouter);

// Resume API
app.get("/getEdu", (req, res) => res.json(data.education));
app.get("/getExp", (req, res) => res.json(data.experience));
app.get("/getOverview", (req, res) => res.json(data.overview));

// API List
app.get("/api-list", (req, res) => {
  res.json({
    save_routes: ["/save/single"],
    fetch_routes: ["/fetch/single", "/fetch/multiple"],
    resume_routes: ["/getEdu", "/getExp", "/getOverview"],
  });
});

// 404 Fallback
app.use("*", (req, res) => {
  res.status(404).send(`No request for ${req.originalUrl} exists`);
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
