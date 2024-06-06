const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const path = require("path");
const cors = require("cors");

dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json({ extended: false }));

// CORS
app.use(cors());


app.get("/", (req: any, res: any) => {
  console.log("Hello world");
  return res.status(200).json({ message: "Hi there! This is a backend API for task management system" });
});

app.listen(PORT, () => console.log("This is listening on PORT: " + PORT));