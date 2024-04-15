const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movie_name: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
