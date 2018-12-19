const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const async = require("async");
const path = require("path");

const { MonMovie } = require("./models/MonthlyMovie");
const User = require("./models/User.js");

//API paths
const users = require("./routes/api/users");
const apply = require("./routes/api/apply");
const monthlyMovies = require("./routes/api/monthlyMovies");
const movies = require("./routes/api/movies");
const stats = require("./routes/api/userArchive");

const app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// Cronjob not complete
// new CronJob(
//   "*/2 * * * *",
//   function() {
//     let todaysDate = new Date();
//     MonMovie.find({}).then(movies => {
//       movies.forEach(movie => {
//         if (todaysDate > new Date(movie.reminder_utc_time)) {
//           console.log("skickar påminelse för filmen ", movie.title);
//           let listOfEmailAdresses = [];
//           movie.seating.map(array => {
//             array.map(item => {
//               if (item.email) {
//                 listOfEmailAdresses.push(item.email);
//               }
//             });
//           });
//           console.log("emailList: ", listOfEmailAdresses);
//         } else {
//           console.log("hitta ingen");
//         }
//       });
//     });
//   },
//   null,
//   true,
//   "Europe/Stockholm"
// );
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
