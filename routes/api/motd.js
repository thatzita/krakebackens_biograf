const express = require("express");
const router = express.Router();

const Motd = require("../../models/Motd.js");

router.get("/getmotdmessage", (req, res) => {
  Motd.find({}, (err, value) => {
    res.json(value);
  });
});

router.post("/updatemessage", (req, res) => {
  let updateMotd = req.body;

  Motd.findOneAndUpdate({ motdId: req.body.motdId }, updateMotd, {
    new: true,
    upsert: true
  })
    .then(message => {
      if (message) {
        res.json({ message });
      } else {
        res.status(400).json({
          title: "Meddelandet finns inte i databasen och kan inte updateras"
        });
      }
    })
    .catch(err => {
      throw err;
    });
});

module.exports = router;
