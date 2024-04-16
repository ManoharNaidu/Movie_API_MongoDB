require("express-async-errors");
require("dotenv").config();
require("./config")();
require("./models/movie.model");
const express = require("express");
const errorHandler = require("./handlers/errorHandler");

const {
  addMovie,
  getAllMoves,
  deleteMovie,
  getAMovie,
  updateMovie,
  movieRecommendation,
} = require("./controllers/Movies");

const app = express();

app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.send(
    "Welcome to the movie database!\nGo to /api/getAllMovies to get all movies\nGo to /api/addMovie to add a movie\nGo to /api/deleteMovie to delete a movie\nGo to /api/getAMovie/:movie_name to get a movie by name\n"
  );
});

app.get("/api/getAllMovies", getAllMoves);

app.get("/api/getMovieRecommendation", movieRecommendation);

app.get("/api/getAMovie/:movie_name", getAMovie);

app.post("/api/addMovie/", addMovie);

app.put("/api/updateMovie/:id", updateMovie);

app.delete("/api/deleteMovie/:movie_name", deleteMovie);

app.use(errorHandler);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
