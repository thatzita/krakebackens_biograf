require("dotenv").config(); // inlogg till epost som skickar mail
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const async = require("async");

const nodemailer = require("nodemailer");

const crypto = require("crypto");

//Validering för användare
const validateRegInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateForgotInput = require("../../validation/forgot");
const validateResetInput = require("../../validation/reset");

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
      const passwordForUser = newUser.password;

      //hasha lösenordet
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const output = `
        <h1>Välkommen till Kråkebackens biograf!</h1>
        <p>${
          req.body.username
        }, du har blivit godkänd av dom högre höjderna och är nu
        medlem i Kråkebackens biograf!</p>
        <ul>
            <li>Ditt användarnamn är:<br>
            <strong>${req.body.username}</strong></li>
            <li>Använd följande epost för att logga: <br>
            <strong>${req.body.email}</strong>
            </li>
            <li>Använd följande lösenord när du loggar in första gången: <br>
            <strong>${passwordForUser}</strong> <br>
            Observera att du kan ändra lösenord när du väl loggat in!
            </li>
        </ul>

        Med vänlig hälsning,
        Kråkebackens biograf
        `;
              let transporter = nodemailer.createTransport({
                service: "Gmail",
                host: "smtp.gmail.com",
                auth: {
                  user: process.env.MAIL_ADDR,
                  pass: process.env.MAIL_PW
                }
              });

              // setup email data with unicode symbols
              let mailOptions = {
                from: '"Kråkebackens Bio" <bringmybeerbro@gmail.com>', // sender address
                to: `${req.body.email}`, // list of receivers
                subject: `Välkommen till Kråkebackens biograf ${
                  req.body.username
                }!`, // Subject line
                html: output // html body
              };

              // send mail with defined transport object
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return console.log(error);
                }
              });

              res.json({ user });
            })
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
        let admin;
        if (user.admin) {
          admin = true;
        } else {
          admin = false;
        }
        //Token skapas med payloaden
        const payload = {
          id: user.id,
          username: user.username,
          email: user.email,
          admin: admin
        };

        //Sign Token, dokumentationen beskriver allt
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 7200000 }, //Hur länge din token ska vara giltlig, 2h
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
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
      moviesViewed: req.user.moviesViewed,
      admin: req.user.admin
    });
  }
);

//GET api/users/allusers
//Hämta alla medlemmar
router.get("/allusers", (req, res) => {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

// TODO: Se till att informationen sparas i userStatsArchive
//GET api/users/resetstats
//nollställ statistik för alla medlemmar
router.get("/resetstats", (req, res) => {
  User.updateMany(
    {},
    { $set: { "stats.season": 0 } },
    { upsert: true },
    function(err, users) {
      res.json(users);
    }
  );
});

//DELETE api/users/
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndDelete({ _id: req.user.id }).then(() =>
      res.json({ success: true })
    );
  }
);

//DELETE api/users/deleteuser > ADMIN KAN GÖRA DETTA
router.delete("/deleteuser", (req, res) => {
  User.findOneAndDelete({ _id: req.body.objId }, function(err, user) {
    res.json({ success: true });
  });
});

//POST api/users/forgot
router.post("/forgot", (req, res, next) => {
  //VALIDERING AV MAILINPUT MÅSTE SKAPAS

  const { errors, isValid } = validateForgotInput(req.body);

  //Validering av email i (forgot.js)
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;

  async.waterfall(
    [
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ email }, function(err, user) {
          if (!user) {
            if (!user) {
              errors.email = "Finns ingen användare med den eposten.";
              return res.status(404).json(errors);
            }
          }

          user.resetPwToken = token;
          user.resetPwExpires = Date.now() + 7200000; // 2 timmar

          // return res.json(user);
          user.save(function(err) {
            done(err, token, user);
          });
          res.send("Epost kommer");
        });
      },
      function(token, user, done) {
        const url = "http://localhost:3000/reset";
        const output = `
      <h1>Glömt lösenord?</h1>
      
      <p>Usch då det var ju dumt att du glömt ditt lösenord.</p>
      <p>Klicka på länken nedan för att skapa ett nytt lösenord:</p>
      <a href="${url}/${token}">Återställ mitt lösenord</a>
      <p>Med vänlig hälsning,
      Kråkebackens biograf</p>
      `;

        let transporter = nodemailer.createTransport({
          service: "Gmail",
          host: "smtp.gmail.com",
          auth: {
            user: process.env.MAIL_ADDR,
            pass: process.env.MAIL_PW
          }
        });

        // setup email data with unicode symbols
        let mailOptions = {
          from: '"Kråkebackens Bio" <bringmybeerbro@gmail.com>', // sender address
          to: `${req.body.email}`, // list of receivers
          subject: `Glömt ditt lösenord?`, // Subject line
          html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
        });
        // .catch(err => console.log(err));
      }
    ],
    function(err) {
      if (err) {
        return res.status(404).json(errors);
      }
    }
  );
});

//TODO: Fixa errorhantering
// api/users/reset/
//http://localhost:5000/api/users/reset/
router.post("/reset/:token", function(req, res) {
  // console.log(req.body);

  const { errors, isValid } = validateResetInput(req.body);

  //Validering av password i (reset.js)
  if (!isValid) {
    return res.status(400).json(errors);
  }

  async.waterfall(
    [
      function(done) {
        User.findOne(
          {
            resetPwToken: req.body.token,
            resetPwExpires: { $gt: Date.now() }
          },
          function(err, user) {
            if (!user) {
              res.send(
                "ERROR: Password reset token is invalid or has expired."
              );
            } else if (req.body.password === req.body.password2) {
              User.findOne({ resetPwToken: req.body.token }, function(
                err,
                user
              ) {
                let success = {};
                user.password = req.body.password;
                user.resetPwToken = undefined;
                user.resetPwExpires = undefined;

                bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user.save(function(err) {
                      if (err) {
                        console.error("ERROR!");
                      } else {
                        success.msg = "Lösenordet är ändrat";
                        res.json(success);
                        done();
                      }
                    });
                  });
                });

                const output = `
    <h1>Vi har återställt ditt lösenord</h1>
    <p>Du kan logga in med dina nya uppgifter.</p>
    <p>Med vänlig hälsning,<br>
    Kråkebackens biograf</p>
    `;

                let transporter = nodemailer.createTransport({
                  service: "Gmail",
                  host: "smtp.gmail.com",
                  auth: {
                    user: process.env.MAIL_ADDR,
                    pass: process.env.MAIL_PW
                  }
                });

                // setup email data with unicode symbols
                let mailOptions = {
                  from: '"Kråkebackens Bio" <bringmybeerbro@gmail.com>', // sender address
                  to: user.email, // list of receivers
                  subject: `Lösenord återställt!`, // Subject line
                  html: output // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    return console.log(error);
                  }
                });
              });
            } else {
              res.send("ERROR:Passwords do not match.");
            }
          }
        );
      }
    ],
    function(err) {
      if (err) {
        return res.status(404).json(errors);
      }
    }
  );
});

//http://localhost:5000/api/users/changepassword/
router.post("/changepassword", function(req, res) {
  console.log(req.body);

  const { errors, isValid } = validateResetInput(req.body);

  //Validering av password i (reset.js)
  if (!isValid) {
    return res.status(400).json(errors);
  }

  async.waterfall(
    [
      function(done) {
        User.findOne(
          {
            _id: req.body.id
          },
          function(err, user) {
            if (!user) {
              res.send("Något gick fel.");
            } else if (req.body.password === req.body.password2) {
              User.findOne({ _id: req.body.id }, function(err, user) {
                let success = {};
                user.password = req.body.password;

                bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user.save(function(err) {
                      if (err) {
                        console.error("ERROR!");
                      } else {
                        success.msg = "Lösenordet är ändrat";
                        res.json(success);
                        done();
                      }
                    });
                  });
                });
              });
            } else {
              res.send("Lösenorden matchar inte");
            }
          }
        );
      }
    ],
    function(err) {
      if (err) {
        return res.status(404).json(errors);
      }
    }
  );
});

module.exports = router;
