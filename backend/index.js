import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/getEdu", (req, res) => {
  res.json([
    { degree: "BSc Computer Science", school: "Example University", year: "2023" },
    { degree: "Diploma in IT", school: "Tech Institute", year: "2021" }
  ]);
});

app.get("/getExp", (req, res) => {
  res.json([
    { role: "Software Developer", company: "Tech Corp", years: "2023-Present" },
    { role: "Intern", company: "Startup Inc.", years: "2022" }
  ]);
});

app.get("/getOverview", (req, res) => {
  res.json("A passionate developer eager to build amazing applications.");
});

app.listen(8000, () => console.log("Server running on port 8000"));
