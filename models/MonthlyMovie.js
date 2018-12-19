const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Movie = require('./Movie')

// type: Schema.ObjectId,
// ref: 'Movie',
// required: true

const MonthlyMovieSchema = new Schema({
  eventType: {
    type: String,
    required: true
  },
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
  monMovieMessage: {
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
  reminderIsSent: {
    type: Boolean,
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
  crowRating: String,
  trailer: String
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
