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

module.exports = router;
