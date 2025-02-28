import express from "express";
import cors from "cors";
import data from "./data.js";
import fetchRouter from "./routers/fetch_router.js";
import saveRouter from "./routers/save_router.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/fetch", fetchRouter);  // File retrieval
app.use("/save", saveRouter);    // File uploads

// Resume Endpoints
app.get("/getEdu", (req, res) => res.json(data.education));
app.get("/getExp", (req, res) => res.json(data.experience));
app.get("/getOverview", (req, res) => res.json(data.overview));

app.listen(8000, () => console.log("Server running on port 8000"));
