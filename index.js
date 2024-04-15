require("dotenv").config();
require("./config")();
require("./models/movie.model");
const express = require("express");

const {
  addMovie,
  getAllMoves,
  deleteMovie,
  getAMovie,
} = require("./controllers/Movies");

const app = express();

app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.send(
    "Welcome to the movie database!\nGo to /api/getAllMovies to get all movies\nGo to /api/addMovie to add a movie\nGo to /api/deleteMovie to delete a movie\n"
  );
});

app.get("/api/getAllMovies", getAllMoves);

app.get("/api/getAMovie/:movie_name", getAMovie);

app.post("/api/addMovie/", addMovie);

app.delete("/api/deleteMovie", deleteMovie);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
