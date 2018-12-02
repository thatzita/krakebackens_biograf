require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const { MonMovie, MonthlyMovieArchive } = require("./models/MonthlyMovie");

// const { MonthlyMovie, MonthlyMovieArchive } = require("./models/MonthlyMovie");

//API paths
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const apply = require("./routes/api/apply");
const monthlyMovies = require("./routes/api/monthlyMovies");
const movies = require("./routes/api/movies");
const stats = require("./routes/api/userArchive");

const app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// console.log(__dirname + "/client/public");

// app.use(express.static(__dirname + "/client/public"));

//Konfiguration för mLab, filen ska inte följa med
const db = require("./config/keys").mongoURI;

//Koppla mot databasen med mongoose
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Kopplad till Kråkebackens databas");
  })
  .catch(err => {
    console.log(err);
  });

//Passport middleware för authentication
app.use(passport.initialize());

//Passport config, separat fil
//https://www.npmjs.com/package/passport-jwt
require("./config/passport.js")(passport);

//Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/apply", apply);
app.use("/api/monthlyMovies", monthlyMovies);
app.use("/api/movies", movies);
app.use("/api/stats", stats);

//Schedule
// 0 9,12,15,18,21,0 * * *
// At minute 0 past hour 9, 12, 15, 18, 21, and 0.
const CronJob = require("cron").CronJob;

new CronJob(
  "0 9,12,15,18,21,0 * * *",
  // "* * * * *",
  function() {
    let todaysDate = new Date();
    MonMovie.find({}).then(monMovie => {
      monMovie.forEach(movie => {
        if (todaysDate > new Date(movie.utc_time)) {
          let swap = new (mongoose.model("monthlyMoviesArchives"))(movie);
          swap._id = mongoose.Types.ObjectId();
          swap.isNew = true;

          movie.remove();
          swap.save();
        } else {
          console.log("Visningen har INTE varit");
        }
      });
    });
  },
  null,
  true,
  "Europe/Stockholm"
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server uppe på port: ${port}`);
});
