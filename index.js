require("dotenv").config();
require("./models/movie.model");
const express = require("express");
const mongoose = require("mongoose");
const { addMovie, getAllMoves } = require("./controllers/Movies");
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });

// ROUTES

app.get("/", (req, res) => {
  res.send("Welcome to the movie database!");
});

app.get("/api/getAllMovies", getAllMoves);

app.post("/api/addMovie", addMovie);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
