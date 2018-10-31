const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//User model
const User = require("../../models/User.js");

//GET api/users/test
router.get("/test", (req, res) => {
  res.json({ message: "User route works" });
});

//POST api/users/register
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "E-post existerar redan" });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      //hasha lösenordet
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json({ user }))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//POST api/users/login
//Returnera JWT Token för att komma åt information

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Hitta användare efter mail
  User.findOne({ email }).then(user => {
    if (!user) {
      return res
        .status(404)
        .json({ email: "Finns ingen användare med den mailen." });
    }

    //Hittar användare, kolla lösenord
    bcrypt.compare(password, user.password).then(match => {
      if (match) {
        //Användare hittades

        //Token skapas med payloaden
        const payload = {
          id: user.id,
          username: user.username,
          email: user.email
        };

        //Sign Token, dokumentationen beskriver allt
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        res.status(400).json({ password: "Fel lösenord" });
      }
    });
  });
});

//GET api/users/current
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      user: req.user,
      varning: "DENNA INFORMATIONEN SKA TAS BORT SENARE"
    });
  }
);

module.exports = router;
