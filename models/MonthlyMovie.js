const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MonthlyMovieSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    genres: Array,
    imdb_id: String,
    overview: String,
    backdrop_path: String,
    poster_path: String,
    runtime: String,
    screeningStatus: {
        type:String,
        default: 'active_default'
    },
    screeningDate: {
       type: Date,
       default: Date.now
    },
    screeningTime: {
        type: Date,
        default: Date.now
     },
    seating: {
        type:Array,
        required: true
    },
    fullyBooked: Boolean,
}); 

module.exports = MonthlyMovie = mongoose.model('monthlyMovies', MonthlyMovieSchema);