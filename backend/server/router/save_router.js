import express from "express";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/single", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  res.json({
    message: "File uploaded successfully",
    filePath: `/uploads/${req.file.filename}`,
  });
});

export default router;
