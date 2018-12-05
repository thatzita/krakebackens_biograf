const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Movie = require('./Movie')

// type: Schema.ObjectId,
// ref: 'Movie',
// required: true

const MonthlyMovieSchema = new Schema({
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
    type: String
  },
  genres: [],
  imdb_id: {
    type: String
  },
  release: {
    type: String
  },
  rating: String,
  screeningDate: {
    type: String,
    required: true
  },
  screeningTime: {
    type: String,
    required: true
  },
  utc_time: {
    type: String,
    required: true
  },
  cancel_utc_time: {
    type: String,
    required: true
  },
  reminder_utc_time: {
    type: String,
    required: true
  },
  seating: {
    type: Array,
    required: true
  },
  saloon: {
    type: String,
    required: true
  },
  fullyBooked: Boolean,
  crowRating: String
});

let MonMovie = mongoose.model("monthlyMovies", MonthlyMovieSchema);

let MonMovieArchive = mongoose.model(
  "monthlyMoviesArchives",
  MonthlyMovieSchema
);

module.exports = {
  MonMovie: MonMovie,
  MonMovieArchive: MonMovieArchive
};
