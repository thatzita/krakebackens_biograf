require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

//API paths
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const apply = require("./routes/api/apply");
const movies = require("./routes/api/movies");

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
app.use("/api/movies", movies);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server uppe på port: ${port}`);
});
