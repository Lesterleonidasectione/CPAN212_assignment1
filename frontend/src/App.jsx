import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [overview, setOverview] = useState({});
  const [displayImage, setDisplayImage] = useState(null);
  const [displayImages, setDisplayImages] = useState([]);
  const [singleFile, setSingleFile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/getOverview")
      .then((res) => setOverview(res.data))
      .catch((err) => console.error(err));
  }, []);

  const fetchSingleFile = async () => {
    try {
      const response = await fetch("http://localhost:8000/fetch/single");
      setDisplayImage(URL.createObjectURL(await response.blob()));
    } catch (error) {
      console.error("Error fetching single file:", error);
    }
  };

  const fetchMultipleImages = async () => {
    try {
      const response = await fetch("http://localhost:8000/fetch/multiple");
      const filenames = await response.json();
      const imageUrls = await Promise.all(
        filenames.map(async (filename) => {
          const fetchFile = await fetch(`http://localhost:8000/fetch/file/${filename}`);
          return URL.createObjectURL(await fetchFile.blob());
        })
      );
      setDisplayImages(imageUrls);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleSingleFileChange = (e) => setSingleFile(e.target.files[0]);

  const handleSubmitSingleFile = async (e) => {
    e.preventDefault();
    if (!singleFile) return setMessage("Please select a file before uploading.");

    try {
      const formData = new FormData();
      formData.append("file", singleFile);
      const response = await fetch("http://localhost:8000/save/single", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Image upload failed");
      setMessage("File uploaded successfully!");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>{overview.name}</h1>
      <h3>{overview.role}</h3>

      <button className="btn btn-primary mt-3" onClick={fetchSingleFile}>
        Fetch Single File
      </button>
      {displayImage && <img src={displayImage} alt="Display" className="mt-3" style={{ width: "200px" }} />}

      <form onSubmit={handleSubmitSingleFile} className="mt-3">
        <input type="file" onChange={handleSingleFileChange} className="form-control" />
        <button type="submit" className="btn btn-success mt-2">Upload File</button>
      </form>
      <p>{message}</p>

      <button className="btn btn-info mt-3" onClick={fetchMultipleImages}>
        Fetch Multiple Files
      </button>
      <div className="d-flex flex-wrap mt-3">
        {displayImages.map((img, index) => (
          <img key={index} src={img} alt="Multiple" className="m-2" style={{ width: "150px" }} />
        ))}
      </div>
    </div>
  );
};

export default App;
