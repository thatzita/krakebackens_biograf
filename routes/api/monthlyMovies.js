require("dotenv").config();

const express = require("express");
const router = express.Router();
const saloonCollection = require("../../seatingStructure/saloonCollection");
const nodemailer = require("nodemailer");
// const salong_2 = require("../../seatingStructure/saloonCollection");

const { MonMovie, MonMovieArchive } = require("../../models/MonthlyMovie");
const Movie = require("../../models/Movie");
const User = require("../../models/User");

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
  // console.log(req.body);
  let updateField = {
    crowRating: req.body.crowRating
  };

  Movie.findOneAndUpdate({ imdb_id: req.body.mov.imdb_id }, updateField, {
    new: true
  }).then(movie => {
    if (movie) {
      // console.log("update crowrating: ", movie);
    } else {
      return res.status(400).json({
        title: "we could not find the movie to update the crow rating"
      });
    }
  });

  MonMovie.findOne({
    $or: [{ title: req.body.mov.title }, { utc_time: req.body.utc_time }]
  })
    .then(movie => {
      if (movie) {
        return res.status(400).json({ title: "This movie already is up" });
      } else {
        User.find({ "vip.status": "true" })
          .then(users => {
            const salong_1 = saloonCollection.salong_1;
            const salong_2 = saloonCollection.salong_2;
            let saloon;
            if (req.body.saloon === "1") {
              saloon = salong_1;
            } else {
              saloon = salong_2;
            }

            if (users && req.body.saloon === "1") {
              saloon.map(array => {
                array.map(x => {
                  let found = false;

                  for (let i = 0; i < users.length; i++) {
                    if (x.seat === users[i].vip.seat) {
                      found = true;
                      break;
                    }
                  }
                  if (found) {
                    x.vip = true;
                  } else {
                    x.vip = false;
                  }
                });
              });
            }

            const newMonMovie = new MonMovie({
              title: req.body.mov.title,
              description: req.body.mov.description,
              monMovieMessage: req.body.monMovieMessage,
              background: req.body.mov.background,
              poster: req.body.mov.poster,
              runtime: req.body.mov.runtime,
              genres: req.body.mov.genres,
              imdb_id: req.body.mov.imdb_id,
              release: req.body.mov.release,
              crowRating: req.body.crowRating,
              trailer: req.body.mov.trailer,

              screeningDate: req.body.date,
              screeningTime: req.body.time,
              utc_time: req.body.utc_time,
              cancel_utc_time: req.body.cancel_utc_time,
              reminder_utc_time: req.body.reminder_utc_time,
              reminderIsSent: false,
              // screeningStatus: "active",
              seating: saloon,
              saloon: req.body.saloon,
              fullyBooked: false
            });

            newMonMovie
              .save()
              .then(monMovie => res.json(monMovie))
              .catch(err => {
                throw err;
              });
          })
          .catch(err => {
            throw err;
          });
      }
    })
    .catch(err => {
      throw err;
    });
});

//@route    Get api/monthlyMovies/updateMonthlyMovie
//@desc     edit and update the movies title, description, screening time and screning date
//@access   private

router.post("/updateMonthlyMovie", (req, res) => {
  // let updateField = {
  //   title: req.body.title,
  //   description: req.body.description,
  //   screeningDate: req.body.date,
  //   screeningTime: req.body.time
  // };

  let updateField = req.body;

  // console.log("uppdatefield: ", req.body);

  MonMovie.findOneAndUpdate({ _id: req.body._id }, updateField, { new: true })
    .then(monMovie => {
      if (monMovie) {
        res.json({ monMovie });
      } else {
        res.status(400).json({
          title: "Filmen finns inte i databasen och kan inte updateras"
        });
      }
    })
    .catch(err => {
      throw err;
    });
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
      // console.log(monMovies);
      res.json({ monMovies });
    })
    .catch(err => {
      throw err;
    });
});

//@route    Get api/mainpage/:movieId
//@desc     GET specific movie from monthlyMoviesDB
//@access   private

router.get("/singlemovie/", (req, res) => {
  let id = req.query.id;

  MonMovie.findOne({ _id: id })
    .then(movie => {
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
  // console.log("the movieID: ", req.body.responsible.email);
  MonMovie.findOne({ _id: req.body.movieId }).then(movie => {
    if (movie) {
      let seatResarvation = req.body.seatResarvation;
      let allSeatsAreAvailable = true;
      console.log(seatResarvation);

      let newSeating = movie.seating.map(array => {
        let newRow = array.map(x => {
          let found = false;
          let reservation = {};
          for (let index = 0; index < seatResarvation.length; index++) {
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
        // the booking was successful, save and return the updated movie
        movie.seating = newSeating;
        let newMovie = movie;
        let seatCount = 0;

        //Check saloon 2 if fullybooked
        if (newMovie.saloon === "2") {
          newMovie.seating[0].map(seat => {
            if (seat.booked) {
              seatCount++;
            }
          });
          newMovie.seating[1].map(seat => {
            if (seat.booked) {
              seatCount++;
            }
          });
          if (seatCount === 8) {
            newMovie.fullyBooked = true;
          }
        }
        //Check saloon 1 if fullybooked
        if (newMovie.saloon === "1") {
          newMovie.seating[0].map(seat => {
            if (seat.booked) {
              seatCount++;
            }
          });
          newMovie.seating[1].map(seat => {
            if (seat.booked) {
              seatCount++;
            }
          });
          newMovie.seating[2].map(seat => {
            if (seat.booked) {
              seatCount++;
            }
          });

          if (seatCount === 18) {
            newMovie.fullyBooked = true;
          }
        }

        newMovie
          .save()
          .then(movie =>
            res.json({ movie, success: true, msg: "Tack för din bokning" })
          )
          .catch(err => console.log(err));

        let output = `
        <!DOCTYPE html>
        <html lang="en" dir="ltr">
        
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title></title>
          <style></style>
        </head>
        
        <body>
          <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
            <tr>
              <td align="center" valign="top">
                <table style="background-color:rgb(71,8,119)" border="0" cellpadding="20" cellspacing="0" width="600" id="emailContainer">
                  <tr>
                    <td align="center" valign="top">
                      <table border="0" cellpadding="20" cellspacing="0" width="100%" id="emailHeader">
                        <tr>
                          <td style="padding-bottom: 5px" align="center" valign="top">
                            <h2 style=" font-family: Arial,sans-serif; color:white">Tack för din bokning!</h2>
                            <!-- <hr/> -->
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color:white;" align="center" valign="top">
                      <table border="0" cellpadding="20" cellspacing="0" width="100%" id="emailBody">
                        <tr>
                          <td style="padding:auto;" align="center" valign="top">
        
                              <p style="font-family: Arial,sans-serif;  margin:0; line-height:27px;">Dina billjetter till filmen <strong> ${
                                movie.title
                              } </strong> kommer finnas på din profilsida. På din profilsida kan du även reglera och avboka biljetter</p>
        
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0" align="center" valign="top">
                      <table style="background-color:#f4f4f4" border="0" cellpadding="20" cellspacing="0" width="100%" id="emailFooter">
                        <tr>
                          <td align="center" valign="top">
                            <p style="font-family: Arial,sans-serif;  margin:0; line-height:27px;">Ni är varmt välkommna</p>
                            <p style="font-family: Arial,sans-serif; margin-top:1rem; font-size: 0.8rem;"> <em>Kom gärna en halvtimme innan visning för mingel och tilltugg</em> </p>
        
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
          `;
        let transporter = nodemailer.createTransport({
          service: "Gmail",
          host: "smtp.gmail.com",
          auth: {
            user: process.env.MAIL_ADDR,
            pass: process.env.MAIL_PW
          }
        });

        let mailOptions = {
          from: `"Kråkebackens Bio" ${process.env.MAIL_ADDR}`,
          to: `bringmybeerbro@gmail.com`, // list of receivers
          subject: "Bokningsbekräftelse", // Subject line
          html: output // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
        });
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
