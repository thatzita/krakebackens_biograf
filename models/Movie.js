const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  background: {
    type: String
  },
  poster: {
    type: String
  },
  runtime: {
    type: Number
  },
  description: {
    type: String,
    required: true
  },
  genres: [],
  imdb_id: {
    type: String
  },
  release: {
    type: String
  }
});

module.exports = Movie = mongoose.model("movies", MovieSchema);
