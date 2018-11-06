require("dotenv").config();
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

//Validering
const validateApplicationInput = require("../../validation/userApplication");

//Apply model
const User = require("../../models/User.js");

//POST api/apply/form
router.post("/form", (req, res) => {
  const { errors, isValid } = validateApplicationInput(req.body);
  let success = {};
  //Validering av registrering
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.find()
    .or([{ email: req.body.email }, { username: req.body.username }])
    .then(user => {
      console.log(user);

      if (user.length > 0) {
        user.forEach(function(data) {
          if (data.username === req.body.username) {
            errors.username = "Användarnamnet existerar redan";
            // return res.status(400).json(errors);
          } else if (data.email === req.body.email) {
            errors.email = "E-post existerar redan";
            // return res.status(400).json(errors);
          }
        });
        return res.status(400).json(errors);
      }
      // console.log(user);
      if (user.length === 0) {
        console.log(user.length);
        success.title = "Förfrågan skickad!";
        res.json(success);

        const output = `
        <h1>Förfrågan om medlemskap från ${req.body.username}</h1>
        <ul>
            <li>Användarnamn som vill användas är:<br>
            <strong>${req.body.username}</strong></li>
            <li>Epost som ska användas är: <br>
            <strong>${req.body.email}</strong>
            </li>
        </ul>
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
          from: `${req.body.email}`, // sender address
          to: '"Kråkebackens Bio" <bringmybeerbro@gmail.com>', // list of receivers
          subject: `Förfrågan om medlemskap från ${req.body.username}`, // Subject line
          html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
        });
      }
    });
});

module.exports = router;
