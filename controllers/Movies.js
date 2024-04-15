const Movie = require("../models/movie.model");

exports.getAllMoves = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addMovie = async (req, res) => {
  const { movie_name, info, rating } = req.body;

  try {
    if (!movie_name || !info || !rating) {
      throw "Please fill in all fields";
    }

    if (await Movie.findOne({ movie_name })) {
      throw "Movie already exists";
    }

    if (rating < 0 || rating > 10) {
      throw "Rating must be between 0 and 10";
    }

    const movie = new Movie({ movie_name, info, rating });
    await movie.save();
    res.status(201).json({ message: "Movie Saved" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.updateMovie = async (req, res) => {};

exports.deleteMovie = async (req, res) => {
  const { movie_name } = req.body;
  try {
    if (!movie_name) {
      throw "Please provide a movie name";
    }

    const movie = await Movie.findOneAndDelete({ movie_name });
    if (!movie) {
      throw "Movie does not exist";
    }
    res.status(200).json({ message: "Movie deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
