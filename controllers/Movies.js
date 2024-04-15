const Movie = require("../models/movie.model");

exports.addMovie = async (req, res) => {
  const { movie_name, info, rating } = req.body;

  if (!movie_name || !info || !rating) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  if (await Movie.findOne({ movie_name })) {
    return res.status(400).json({ message: "Movie already exists" });
  }

  try {
    const movie = new Movie({ movie_name, info, rating });
    await movie.save();
    res.status(201).json({ message: "Movie Saved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllMoves = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
