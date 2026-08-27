import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notes.routes.js";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();

const app = express();
//Middlewares
app.use(
  cors({
    origin: "http://localhost:5173"
  })
);
app.use(rateLimiter);
app.use(express.json());

app.use("/notes", notesRoutes);
const PORT = process.env.PORT || 5001;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
