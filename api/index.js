import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import morgan from "morgan";
import multer from "multer";

import path from "path";
import { fileURLToPath } from "url";

import allRoutes from "./routes/index.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;

//Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

//Handle error
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something bad happened";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "/images")));

//Routes
app.use("/api", allRoutes);

//Save Images
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
  destination: (req, file, cb) => {
    cb(null, "images");
  },
});

// const maxSize = 2 * 1024 * 1024;
const upload = multer({ storage: storage }); //limits: { fileSize: maxSize } }
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded.");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Now running on ${PORT}`);
});
