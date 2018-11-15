const express = require('express');
const router = express.Router();

const MonMovie = require('../../models/MonthlyMovie');

//@route    Get api/monthlyMovies/test
//@desc     Test monthlyMovies route
//@access   Public
router.get('/test', (req,res) => res.json({msg:'monthly movies works!'}));

//@route    Post api/monthlyMovies/uploadMoviePremiere
//@desc     Post a movie premiere to monthlyMovies
//@access   private
router.post("/uploadMoviePremiere", (req,res) => {
    MonMovie.findOne({ $or : [{title: req.body.mov.title}, {utc_time: req.body.utc_time}]}).then(movie =>{
        
        if (movie) {
            return res.status(400).json({title: 'This movie allready is up'});
        } else {
            
            const newMonMovie = new MonMovie({
                title: req.body.mov.title,
                description: req.body.mov.description,
                background: req.body.mov.background,
                poster: req.body.mov.poster,
                runtime: req.body.mov.runtime,
                genres: req.body.mov.genres,
                imdb_id: req.body.mov.imdb_id,
                release: req.body.mov.release,
                
                screeningDate: req.body.date,
                screeningTime: req.body.time,
                utc_time: req.body.utc_time,
                screeningStatus: 'active',
                seating: [
                    {seat: 1, booked: false},
                    {seat: 2, booked: false},
                    {seat: 3, booked: false},
                    {seat: 4, booked: false},
                    {seat: 5, booked: false},
                    {seat: 6, booked: false},
                    {seat: 7, booked: false},
                    {seat: 8, booked: false},
                    {seat: 9, booked: false},
                    {seat: 10, booked: false},
                    {seat: 11, booked: false},
                    {seat: 12, booked: false},
                    {seat: 13, booked: false},
                    {seat: 14, booked: false},
                    {seat: 15, booked: false}

                ],
                fullyBooked: false,
            });

            newMonMovie.save()
            .then(monMovie => res.json(monMovie))
            .catch(err => console.log(err));
        }
    })
});

//@route    Get api/monthlyMovies/getAllMonMovies
//@desc     GET all movies from monthlyMoviesDB
//@access   private
router.get('/getAllMonMovies', (req,res) => {
    MonMovie.find({})
    .then(monMovies => {
        res.json({monMovies});
    });
});

module.exports = router;