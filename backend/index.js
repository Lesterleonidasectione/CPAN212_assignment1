import express from "express";
import cors from "cors";

const app = express();

// Enable CORS for React frontend (http://localhost:3000)
app.use(cors({ origin: "http://localhost:3000" }));


app.get("/getEdu", (req, res) => {
  res.json([
    { degree: "BSc Nursing", school: "Family Clinic College", year: "2010" },
    { degree: "Advance Diploma in Computer Programming Analysis",
        school: "Humber Polytechnic",
        year: "ongoing" }
  ]);
});

app.get("/getExp", (req, res) => {
  res.json([
    { role: "Junior Web Developer", company: "Fiverr", years: "2022-Present" },
    { role: "Nurse Intern", company: "Family CLinic Hospital", years: "2007-2010" }
  ]);
});


app.get("/getOverview", (req, res) => {
  res.json("A passionate developer eager to build amazing applications.");
});

app.get("/getSkills", (req, res) => {
  res.json(["JavaScript", "React", "Node.js", "Java", "SQL"]);
});

app.get("/getCertifications", (req, res) => {
  res.json(["AWS Certified Developer", "Google UX Design"]);
});


app.listen(8000, () => console.log("Backend running on port 8000"));
