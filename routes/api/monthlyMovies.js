const express = require("express");
const router = express.Router();

const { MonMovie, MonMovieArchive } = require("../../models/MonthlyMovie");

//@route    Get api/monthlyMovies/test
//@desc     Test monthlyMovies route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "monthly movies works!" }));

router.get("/moviearchive", (req, res) => {
  MonMovieArchive.find({})
    .then(archive => {
      res.json({ archive });
    })
    .catch(err => {
      res.json(err);
    });
});

//@route    Post api/monthlyMovies/uploadMoviePremiere
//@desc     Post a movie premiere to monthlyMovies
//@access   private
router.post("/uploadMoviePremiere", (req, res) => {
  MonMovie.findOne({
    $or: [{ title: req.body.mov.title }, { utc_time: req.body.utc_time }]
  }).then(movie => {
    if (movie) {
      return res.status(400).json({ title: "This movie allready is up" });
    } else {
      const salong_1 = [
        [
          {
            seat: "extra_1",
            row: 1,
            seatNr: "1.1",
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          },
          {
            seat: "r1s4",
            seatNr: "4",
            row: 1,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          },
          {
            seat: "r1s3",
            seatNr: "3",
            row: 1,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          },
          {
            seat: "r1s2",
            seatNr: "2",
            row: 1,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          },
          {
            seat: "r1s1",
            seatNr: "1",
            row: 1,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          },
          {
            seat: "extra_2",
            seatNr: "1.2",
            row: 2,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          },
          {
            seat: "extra_3",
            seatNr: "1.3",
            row: 3,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          }
        ],
        [
          {
            seat: "r2s5",
            seatNr: "5",
            row: 2,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          },
          {
            seat: "r2s4",
            seatNr: "4",
            row: 2,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          },
          {
            seat: "r2s3",
            seatNr: "3",
            row: 2,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          },
          {
            seat: "r2s2",
            seatNr: "2",
            row: 2,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          },
          {
            seat: "r2s1",
            seatNr: "1",
            row: 2,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          }
        ],
        [
          {
            seat: "r3s6",
            seatNr: "6",
            row: 3,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          },
          {
            seat: "r3s5",
            seatNr: "5",
            row: 3,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          },
          {
            seat: "r3s4",
            seatNr: "4",
            row: 3,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          },
          {
            seat: "r3s3",
            seatNr: "3",
            row: 3,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          },
          {
            seat: "r3s2",
            seatNr: "2",
            row: 3,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          },
          {
            seat: "r3s1",
            seatNr: "1",
            row: 3,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          }
        ]
      ];

      const salong_2 = [
        [
          {
            seat: "extra_4",
            seatNr: "4",
            row: 1,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          },
          {
            seat: "extra_3",
            seatNr: "3",
            row: 1,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          },
          {
            seat: "extra_2",
            seatNr: "2",
            row: 1,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          },
          {
            seat: "extra_1",
            seatNr: "1",
            row: 1,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          }
        ],
        [
          {
            seat: "r1s4",
            seatNr: "4",
            row: 1,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          },
          {
            seat: "r1s3",
            seatNr: "3",
            row: 1,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          },
          {
            seat: "r1s2",
            seatNr: "2",
            row: 1,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          },
          {
            seat: "r1s1",
            seatNr: "1",
            row: 1,
            booked: false,
            customer: "",
            responsible: "",
            vip: false
          }
        ]
      ];
      let saloon;
      if (req.body.saloon === "1") {
        saloon = salong_1;
      } else {
        saloon = salong_2;
      }

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
        screeningStatus: "active",
        seating: saloon,
        saloon: req.body.saloon,
        fullyBooked: false
      });

      newMonMovie
        .save()
        .then(monMovie => res.json(monMovie))
        .catch(err => console.log(err));
    }
  });
});

//@route    Get api/monthlyMovies/updateMonthlyMovie
//@desc     edit and update the movies title, description, screening time and screning date
//@access   private

router.post("/updateMonthlyMovie", (req, res) => {
  let updateField = {
    title: req.body.title,
    description: req.body.description,
    screeningDate: req.body.date,
    screeningTime: req.body.time
  };

  MonMovie.findOneAndUpdate({ _id: req.body._id }, updateField)
    .then(movie => {
      if (movie) {
        res.json({ movie });
      } else {
        res.status(400).json({
          title: "Filmen finns inte i databasen och kan inte updateras"
        });
      }
    })
    .catch(err => console.log(err));
});

//@route    Get api/monthlyMovies/deleteMonthlyMovie
//@desc     delete monthly movie
//@access   private

router.delete("/deleteMonthlyMovie", (req, res) => {
  MonMovie.findOneAndDelete({ _id: req.body.objId }).then(() => {
    res.json({ success: true });
  });
});

//@route    Get api/monthlyMovies/getAllMonthlyMovies
//@desc     GET all movies from monthlyMoviesDB
//@access   private
router.get("/getAllMonthlyMovies", (req, res) => {
  MonMovie.find({})
    .then(monMovies => {
      res.json({ monMovies });
    })
    .catch(err => console.log(err));
});

//@route    Get api/mainpage/:movieId
//@desc     GET specific movie from monthlyMoviesDB
//@access   private

router.get("/singlemovie/", (req, res) => {
  console.log(req.query.id);
  let id = req.query.id;

  MonMovie.findOne({ _id: id })
    .then(movie => {
      console.log("found movie item");
      console.log("movieItem ", movie);
      if (movie) {
        res.json({ movie });
      } else {
        res.json({ msg: "404 not found" });
      }
    })
    .catch(err => {
      res.json({ msg: "404 not found" });
      console.log(err);
    });
});

// complete and save booking
router.post("/completeAndSaveBooking", (req, res) => {
  console.log("the movieID: ", req.body.movieId);

  // let updatingField = {
  //   seating:
  // }

  MonMovie.findOne({ _id: req.body.movieId }).then(movie => {
    if (movie) {
      let seatResarvation = req.body.seatResarvation;
      let allSeatsAreAvailable = true;

      let newSeating = movie.seating.map(array => {
        let newRow = array.map(x => {
          let found = false;
          let reservation = {};
          for (let index = 0; index < seatResarvation.length; index++) {
            console.log(x.booked);

            if (seatResarvation[index].seat === x.seat) {
              found = true;
              if (x.booked === false) {
                reservation = seatResarvation[index];
                break;
              } else {
                allSeatsAreAvailable = false;
                break;
              }
            }
          }

          if (found) {
            return reservation;
          } else {
            return x;
          }
        });

        return newRow;
      });
      if (allSeatsAreAvailable) {
        movie.seating = newSeating;
        let newMovie = movie;
        newMovie
          .save()
          .then(movie =>
            res.json({ movie, success: true, msg: "Tack för din bokning" })
          )
          .catch(err => console.log(err));
      } else {
        res.json({
          movie,
          success: false,
          msg:
            "Någon var tyvärr snabbare och bokade platserna före dig, vänligen försök igen "
        });
      }
    } else {
      return res
        .status(404)
        .json({ title: "The movie you are trying to book do not exist" });
    }
  });
});

module.exports = router;
