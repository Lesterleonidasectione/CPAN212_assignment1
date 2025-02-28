import { useEffect, useState } from "react";

const App = () => {
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [overview, setOverview] = useState("");

  useEffect(() => {
    // Fetch Education
    fetch("http://localhost:8000/getEdu")
      .then((res) => res.json())
      .then((data) => setEducation(data))
      .catch((err) => console.error("Error fetching education:", err));

    // Fetch Experience
    fetch("http://localhost:8000/getExp")
      .then((res) => res.json())
      .then((data) => setExperience(data))
      .catch((err) => console.error("Error fetching experience:", err));

    // Fetch Overview
    fetch("http://localhost:8000/getOverview")
      .then((res) => res.json())
      .then((data) => setOverview(data))
      .catch((err) => console.error("Error fetching overview:", err));
  }, []);

  return (
    <div style={{ padding: "15px", fontFamily: "Arial, sans-serif" }}>
      <h1>My Portfolio</h1>

      <section>
        <h2>Overview</h2>
        <p>{overview}</p>
      </section>

      <section>
        <h2>Education</h2>
        <ul>
          {education.map((edu, index) => (
            <li key={index}>{edu.degree} - {edu.school} ({edu.year})</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Experience</h2>
        <ul>
          {experience.map((exp, index) => (
            <li key={index}>{exp.role} at {exp.company} ({exp.years})</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default App;
