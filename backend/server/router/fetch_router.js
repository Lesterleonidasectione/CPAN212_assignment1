import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import _ from "lodash";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const upload_directory = path.join(__dirname, "../uploads");

// Fetch Single File
router.get("/single", (req, res) => {
  const files = fs.readdirSync(upload_directory);
  if (files.length === 0) return res.status(503).json({ message: "No images available" });

  let filename = _.sample(files);
  res.sendFile(path.join(upload_directory, filename));
});

// Fetch Specific File
router.get("/file/:filename", (req, res) => {
  res.sendFile(path.join(upload_directory, req.params.filename));
});

// Fetch Multiple Files
router.get("/multiple", (req, res) => {
  const files = fs.readdirSync(upload_directory);
  if (files.length === 0) return res.status(503).json({ message: "No images available" });

  let filenames = _.sampleSize(files, Math.min(files.length, 12));
  res.json(filenames);
});

export default router;
