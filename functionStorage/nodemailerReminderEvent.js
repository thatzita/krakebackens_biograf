// const express = require("express");

const nodemailer = require("nodemailer");

const nodemailerReminderEvent = (
  movieName,
  movieDate,
  movieTime,
  movieMessage,
  emailList
) => {
  // console.log("function works");

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
                            <h2 style=" font-family: Arial,sans-serif; color:white">Påminnelse!</h2>
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

                              <p style="font-family: Arial,sans-serif;  margin:0; line-height:27px;">Detta är en påminnelse till att du har biljetter till eventet <strong> ${movieName} </strong>.</p>
                              <p> Datum: ${movieDate}</p>
                              <p> tid: ${movieTime}</p>

                              <p>Du kan hitta dina biljetter på din profilsida. Om du inte kan komma, glöm inte att avboka. Du kan avboka dina biljetter fram tills 2 timmar innan visningen.</p>

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
                            <p style="font-family: Arial,sans-serif;  margin:0; line-height:27px;">Ni är varmt välkomna</p>
                            <p style="font-family: Arial,sans-serif; margin-top:1rem; font-size: 0.8rem;"> <em>${movieMessage}</em> </p>

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
    from: `"Kråkebackens Bio" <bringmybeerbro@gmail.com>`,
    to: emailList, // list of receivers
    subject: "Påminelse", // Subject line
    // text: 'Hello world?', // plain text body
    html: output // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return false;
    }
    return true;
    // console.log("info: ", info);
  });
};

module.exports = nodemailerReminderEvent;
