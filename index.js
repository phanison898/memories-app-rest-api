import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config.js";
import postRoute from "./routes/posts.js";
import authRoute from "./routes/auth.js";

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome!!!" });
});

app.use("/posts", postRoute);
app.use("/users", authRoute);

const CONNECTION_URL = process.env.DB_CONNECTION;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
