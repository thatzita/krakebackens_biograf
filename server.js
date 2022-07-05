const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const async = require("async");
const path = require("path");

const { MonMovie } = require("./models/MonthlyMovie");
const { MonEvent } = require("./models/MonthlyEvent");
const User = require("./models/User.js");

const nodemailerReminder = require("./functionStorage/nodemailerReminder");
const nodemailerReminderEvent = require("./functionStorage/nodemailerReminderEvent");

//API paths
const users = require("./routes/api/users");
const apply = require("./routes/api/apply");
const monthlyMovies = require("./routes/api/monthlyMovies");
const movies = require("./routes/api/movies");
const stats = require("./routes/api/userArchive");

const motd = require("./routes/api/motd");

const app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Konfiguration för mLab, filen ska inte följa med
const db = require("./config/keys").mongoURI;

//Koppla mot databasen med mongoose
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Kopplad till Kråkebackens databas");
  })
  .catch(err => {
    throw err;
  });

//Passport middleware för authentication
app.use(passport.initialize());

//Passport config, separat fil
//https://www.npmjs.com/package/passport-jwt
require("./config/passport.js")(passport);

//Routes
app.use("/api/users", users);
app.use("/api/apply", apply);
app.use("/api/monthlyMovies", monthlyMovies);
app.use("/api/movies", movies);
app.use("/api/stats", stats);
app.use("/api/motd", motd);

//Schedule
const CronJob = require("cron").CronJob;
new CronJob(
  // "0 9,12,15,18,21,0 * * *", // At minute 0 past hour 9, 12, 15, 18, 21, and 0.
  "* * * * *", // Varje minut
  async function() {
    let todaysDate = new Date();
    let seatsTaken = [];
    let archivedMovie = await MonMovie.find({});
    await archivedMovie.forEach(movie => {
      if (todaysDate > new Date(movie.utc_time)) {
        let swap = new (mongoose.model("monthlyMoviesArchives"))(movie);
        swap._id = mongoose.Types.ObjectId();
        swap.isNew = true;

        let movieSeats = movie;

        if (movie.saloon === "1") {
          movieSeats.seating[0].map(user => {
            if (user.customer.id) {
              seatsTaken.push(user.customer.email);
            } else if (user.customer.status === 3) {
              user.customer.email = "charliegh.christyana@moneyln.com"; //Dummy mail, existerar inte
              seatsTaken.push(user.customer.email);
            }
          });
          movieSeats.seating[1].map(user => {
            if (user.customer.id) {
              seatsTaken.push(user.customer.email);
            } else if (user.customer.status === 3) {
              user.customer.email = "charliegh.christyana@moneyln.com"; //Dummy mail, existerar inte
              seatsTaken.push(user.customer.email);
            }
          });
          movieSeats.seating[2].map(user => {
            if (user.customer.id) {
              seatsTaken.push(user.customer.email);
            } else if (user.customer.status === 3) {
              user.customer.email = "charliegh.christyana@moneyln.com"; //Dummy mail, existerar inte
              seatsTaken.push(user.customer.email);
            }
          });
        } else if (movie.saloon === "2") {
          movieSeats.seating[0].map(user => {
            if (user.customer.id) {
              seatsTaken.push(user.customer.email);
            } else if (user.customer.status === 3) {
              user.customer.email = "charliegh.christyana@moneyln.com"; //Dummy mail, existerar inte
              seatsTaken.push(user.customer.email);
            }
          });
          movieSeats.seating[1].map(user => {
            if (user.customer.id) {
              seatsTaken.push(user.customer.email);
            } else if (user.customer.status === 3) {
              user.customer.email = "charliegh.christyana@moneyln.com"; //Dummy mail, existerar inte
              seatsTaken.push(user.customer.email);
            }
          });
        }

        movie.remove();
        swap.save();

        return seatsTaken;
      }
    });
    let updateUser = await User.find({ email: { $in: seatsTaken } });

    await updateUser.map(user => {
      let count = 0;
      for (let i = 0; i < seatsTaken.length; i++) {
        if (user.email === seatsTaken[i]) {
          count++;
        }
      }

      user.stats.season = user.stats.season + count;
      user.stats.total = user.stats.total + count;
      user.save();
    });
  },
  null,
  true,
  "Europe/Stockholm"
);

new CronJob(
  // "0 9,12,15,18,21,0 * * *", // At minute 0 past hour 9, 12, 15, 18, 21, and 0.
  "* * * * *", // Varje minut
  async function() {
    let todaysDate = new Date();
    let seatsTaken = [];
    let findMonEvent = await MonEvent.find({});

    await findMonEvent.forEach(event => {
      if (todaysDate > new Date(event.utc_time)) {
        let swap = new (mongoose.model("monthlyEventsArchives"))(event);
        swap._id = mongoose.Types.ObjectId();
        swap.isNew = true;

        eventSeats = event;

        eventSeats.seating.map(user => {
          if (user.customer.id) {
            seatsTaken.push(user.customer.email);
          }
        });
        event.remove();
        swap.save();

        return seatsTaken;
      }
    });

    let updateUser = await User.find({ email: { $in: seatsTaken } });

    await updateUser.map(user => {
      let count = 0;
      for (let i = 0; i < seatsTaken.length; i++) {
        if (user.email === seatsTaken[i]) {
          count++;
        }
      }

      user.stats.season = user.stats.season + count;
      user.stats.total = user.stats.total + count;
      user.save();
    });
  },
  null,
  true,
  "Europe/Stockholm"
);

// Cronjob for reminders fully functioning
new CronJob(
  "*/1 * * * *",
  function() {
    let todaysDate = new Date();
    MonMovie.find({}).then(movies => {
      movies.forEach(movie => {
        if (
          todaysDate > new Date(movie.reminder_utc_time) &&
          movie.reminderIsSent === false
        ) {
          let listOfEmailAdresses = [];
          movie.seating.map(array => {
            array.map(item => {
              if (
                item.responsible.email &&
                listOfEmailAdresses.includes(item.responsible.email) === false
              ) {
                listOfEmailAdresses.push(item.responsible.email);
              }
            });
          });

          let resultValue = nodemailerReminder(
            movie.title,
            movie.screeningDate,
            movie.screeningTime,
            movie.monMovieMessage,
            listOfEmailAdresses
          );

          movie.reminderIsSent = true;
          let newMonMovie = movie;

          newMonMovie
            .save()
            .then(monMovie => console.log(monMovie))
            .catch(err => {
              throw err;
            });
        } else {
        }
      });
    });
  },
  null,
  true,
  "Europe/Stockholm"
);

// Remindeer for events
new CronJob(
  "*/1 * * * *",
  function() {
    let todaysDate = new Date();
    MonEvent.find({}).then(events => {
      events.forEach(event => {
        if (
          todaysDate > new Date(event.reminder_utc_time) &&
          event.reminderIsSent === false
        ) {
          console.log("skickar påminnelse för filmen ", event.title);
          let listOfEmailAdresses = [];

          event.seating.map(item => {
            if (
              item.responsible.email &&
              listOfEmailAdresses.includes(item.responsible.email) === false
            ) {
              listOfEmailAdresses.push(item.responsible.email);
            }
          });

          let resultValue = nodemailerReminderEvent(
            event.title,
            event.screeningDate,
            event.screeningTime,
            event.monEventMessage,
            listOfEmailAdresses
          );

          event.reminderIsSent = true;
          let newMonEvent = event;

          newMonEvent
            .save()
            .then(monEvent => console.log(monEvent))
            .catch(err => {
              throw err;
            });
        }
      });
    });
  },
  null,
  true,
  "Europe/Stockholm"
);

//Server static assets if in prod

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server uppe på port: ${port}`);
});
