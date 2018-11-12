const express = require("express");
const router = express.Router();

//Validering
const validateMovieInput = require("../../validation/movies");

//Apply model
const Movie = require("../../models/Movie.js");

//POST api/movies/addmovie
router.post("/addmovie", (req, res) => {
  const { errors, isValid } = validateMovieInput(req.body);
  let success = {};

  //Validering av film
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //LÄGG TILL FILM I DB
  Movie.findOne({ imdb_id: req.body.imdb_id }).then(movie => {
    if (movie) {
      //VERIFIERA
      errors.imdb = "Filmen finns redan i databasen";
      return res.status(400).json(errors);
    } else {
      const newMovie = new Movie({
        title: req.body.title,
        description: req.body.description,
        background: req.body.background,
        poster: req.body.poster,
        runtime: req.body.runtime,
        genres: req.body.genres,
        imdb_id: req.body.imdb_id,
        release: req.body.release
      });
      newMovie.save().then(movie => {
        res.json({ movie });
      });
    }
  });
});

//HÄMTA FILMERNA I DB
router.get("/allmovies", (req, res) => {
  Movie.find({}).then(movies => {
    res.json({ movies });
  });
});

//TA BORT FILMER FRÅN DB

router.delete("/", (req, res) => {
  console.log(req.body.objId);
  Movie.findOneAndDelete({ _id: req.body.objId }).then(() =>
    res.json({ success: true })
  );
});

module.exports = router;
