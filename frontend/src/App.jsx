import { useEffect, useState } from "react";
import './index.css';

function App() {
  const [overview, setOverview] = useState("");
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [overviewRes, eduRes, expRes] = await Promise.all([
          fetch("http://localhost:8000/getOverview").then(res => res.json()),
          fetch("http://localhost:8000/getEdu").then(res => res.json()),
          fetch("http://localhost:8000/getExp").then(res => res.json()),
        ]);

        console.log("Overview:", overviewRes);
        console.log("Education:", eduRes);
        console.log("Experience:", expRes);

        setOverview(overviewRes);
        setEducation(eduRes);
        setExperience(expRes);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>My Portfolio</h1>

      <section className="section">
        <h2 className="section-title">Overview</h2>
        <p className="item">{loading ? "Loading..." : overview}</p>
      </section>

      <section className="section">
        <h2 className="section-title">Education</h2>
        {loading ? (
          <p className="item">Loading...</p>
        ) : education.length > 0 ? (
          <ul>
            {education.map((edu, index) => (
              <li className="item" key={index}>
                <strong>{edu.degree}</strong> - {edu.school} ({edu.year})
              </li>
            ))}
          </ul>
        ) : (
          <p className="item">No education records available.</p>
        )}
      </section>

      <section className="section">
        <h2 className="section-title">Experience</h2>
        {loading ? (
          <p className="item">Loading...</p>
        ) : experience.length > 0 ? (
          <ul>
            {experience.map((exp, index) => (
              <li className="item" key={index}>
                <strong>{exp.role}</strong> at {exp.company} ({exp.years})
              </li>
            ))}
          </ul>
        ) : (
          <p className="item">No experience records available.</p>
        )}
      </section>
    </div>
  );
}

export default App;
