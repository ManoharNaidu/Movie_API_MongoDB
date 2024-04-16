const Movie = require("../models/movie.model");
const { OpenAI } = require("openai");

exports.getAllMoves = async (req, res) => {
  const movies = await Movie.find({});
  res.status(200).json(movies);
};

exports.getAMovie = async (req, res) => {
  const { movie_name } = req.params;

  if (!movie_name) {
    throw "Please provide a movie name";
  }

  const movie = await Movie.findOne({ movie_name });

  if (!movie) {
    throw "Movie does not exist";
  }
  res.status(200).json(movie);
};

exports.addMovie = async (req, res) => {
  const { movie_name, info, rating } = req.body;

  if (!movie_name || !info || !rating) {
    throw "Please fill in all fields";
  }

  if (await Movie.findOne({ movie_name })) {
    throw "Movie already exists";
  }

  if (rating < 0 || rating > 10) {
    throw "Rating must be between 0 and 10";
  }

  // const movie = new Movie({ movie_name, info, rating });
  // await movie.save();
  const movie = await Movie.create({ movie_name, info, rating });
  res.status(201).json({ message: "Movie Saved", movie });
};

exports.updateMovie = async (req, res) => {
  const { id } = req.params;
  const { movie_name, info, rating } = req.body;

  await Movie.updateOne(
    { _id: id },
    { movie_name, info, rating },
    { runValidators: true }
  );
  res.status(200).json({ message: "Movie updated" });
};

exports.deleteMovie = async (req, res) => {
  const { movie_name } = req.params;

  if (!movie_name) {
    throw "Please provide a movie name";
  }

  const movie = await Movie.findOneAndDelete({ movie_name });
  if (!movie) {
    throw "Movie does not exist";
  }
  res.status(200).json({ message: "Movie deleted" });
};

exports.movieRecommendation = async (req, res) => {
  const openai = new OpenAI({ apikey: process.env.OPENAI_API_KEY });

  const allMovies = await Movie.find({});
  const movieString = allMovies.map((movie) => movie.movie_name).join(", ");

  const prompt = `I am looking for a movie to watch. And I watch ${movieString} movies. Can you suggest me 15 movies to watch?`;

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    max_tokens: 100,
  });

  console.log(chatCompletion.data.choices[0].text);
  res.status(200).json({ message: chatCompletion.data.choices[0].text });
};
