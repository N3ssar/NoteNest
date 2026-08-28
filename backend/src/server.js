import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRoutes from "./routes/notes.routes.js";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();

const app = express();
const __dirname = path.resolve();

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "https://note-nest-alpha.vercel.app"],
    credentials: true
  })
);
app.use(rateLimiter);
app.use(express.json());

app.use("/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  );
}

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
