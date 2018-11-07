const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Validering för användare
const validateRegInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//User model
const User = require("../../models/User.js");

//POST api/users/register
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegInput(req.body);

  //Validering av registrering
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "E-post existerar redan";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        vip: req.body.vip,
        stats: req.body.stats
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
  const { errors, isValid } = validateLoginInput(req.body);

  //Validering av login
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Hitta användare efter mail
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "Finns ingen användare med den eposten.";
      return res.status(404).json(errors);
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
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 60 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        errors.password = "Fel lösenord";
        res.status(400).json(errors);
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
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      vip: req.user.vip,
      stats: req.user.stats,
      varning: "DENNA INFORMATIONEN SKA TAS BORT SENARE"
    });
  }
);

module.exports = router;
