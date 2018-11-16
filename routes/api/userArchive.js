const express = require("express");
const router = express.Router();

//Stats model
const UserStatistics = require("../../models/UserStatistic.js");

//GET api/stats/test
router.get("/test", (req, res) => {
  res.json({ message: "Statistics route works" });
});

//POST api/stats/
router.post("/userarchive", (req, res) => {
  console.log(req.body);
  const newArchive = new UserStatistics({
    seasonUserViewings: req.body.seasonUserViewings,
    seasonTopUsers: req.body.seasonTopUsers,
    archivedDate: req.body.archivedDate
  })
    .save()
    .then(archived => {
      res.json(archived);
    });
});

module.exports = router;
