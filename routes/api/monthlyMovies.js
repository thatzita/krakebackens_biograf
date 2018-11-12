const express = require('express');
const router = express.Router();

const MonMovie = require('../../models/MonthlyMovie');

//@route    Get api/monthlyMovies/test
//@desc     Test monthlyMovies route
//@access   Public
router.get('/test', (req,res) => res.json({msg:'monthly movies works!'}));

//@route    Post api/monthlyMovies/test
//@desc     Post a movie premiere to monthlyMovies
//@access   Public
router.post("/uploadMoviePremiere", (req,res) => {
    MonMovie.findOne({title: req.body.title}).then(movie =>{
        if (movie) {
            return res.status(400).json({title: 'This movie allready is up'});
        } else {
            const newMonMovie = new MonMovie({
                title: req.body.title,
                genres: req.body.genres,
                imdb_id: req.body.imdb_id,
                overview: req.body.overview,
                backdrop_path: req.body.backdrop_path,
                poster_path: req.body.poster_path,
                runtime: req.body.runtime,
                screeningStatus: 'active',
                seating: [
                    {seat: 1, booked: false},
                    {seat: 2, booked: false},
                    {seat: 3, booked: false},
                    {seat: 4, booked: false},
                    {seat: 5, booked: false}
                ],
                fullyBooked: false,
            });

            newMonMovie.save()
            .then(monMovie => res.json(monMovie))
            .catch(err => console.log(err));
        }
    })
});

router.get('/getMoviesforMonMovies', (req,res) =>{
    res.json({msg: 'get all movies'});
})

module.exports = router;