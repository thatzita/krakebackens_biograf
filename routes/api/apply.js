require("dotenv").config();
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

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
      if (user.length > 0) {
        user.forEach(function(data) {
          if (data.username === req.body.username) {
            errors.username = "Användarnamnet existerar redan";
          } else if (data.email === req.body.email) {
            errors.email = "E-post existerar redan";
          }
        });
        return res.status(400).json(errors);
      }

      if (user.length === 0) {
        success.title = "Förfrågan skickad!";
        res.json(success);

        const output = `
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
                            <h2 style=" font-family: Arial,sans-serif; color:white">Förfrågan om medlemskap från ${
                              req.body.username
                            }</h2>
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
        
                          <ul style="list-style: none; font-family: Arial,sans-serif;  margin:0; line-height:27px;">
                          <li>Användarnamn som vill användas är:<br>
                          <strong>${req.body.username}</strong></li>
                          <li>Epost som ska användas är: <br>
                          <strong>${req.body.email}</strong>
                          </li>
                      </ul>
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
                            <p style="font-family: Arial,sans-serif; margin-top:1rem; font-size: 0.8rem;"> <em>Hälsningar från ${
                              req.body.username
                            }</em> </p>
        
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
        console.log(process.env.MAIL_ADDR);
        // setup email data with unicode symbols
        let mailOptions = {
          from: `${req.body.email}`, // sender address
          to: `"Kråkebackens Biograf" ${process.env.MAIL_ADDR}`,
          subject: `Förfrågan om medlemskap från ${req.body.username}`, // Subject line
          html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return error;
          }
        });
      }
    });
});

module.exports = router;
