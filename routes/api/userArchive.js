const express = require("express");
const router = express.Router();

//Stats model
const UserStatistics = require("../../models/UserStatistic.js");

//Hämta hem all stats från arkivet
//GET api/stats/userstats
router.get("/userstats", (req, res) => {
  UserStatistics.find({}).then(stats => {
    res.json(stats);
  });
});

//Nollställ och spara årets användardata till arkivet
//POST api/stats/userarchive
router.post("/userarchive", (req, res) => {
  const newArchive = new UserStatistics({
    seasonUserViewings: req.body.seasonUserViewings,
    seasonTopUsers: req.body.seasonTopUsers,
    archivedDate: req.body.archivedDate
  });

  newArchive.save().then(archived => {
    res.json(archived);
  });
});

//Hämta användardata från arkivet
//GET api/stats/getuserarchive

router.get("/getuserarchive", (req, res) => {
  UserStatistics.find({}, (err, stats) => {
    res.json(stats);
  });
});
module.exports = router;
