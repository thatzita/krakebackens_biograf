const express = require("express");
const router = express.Router();

//router kommer användas istället för app.get

//GET api/profile/test
router.get("/test", (req, res) => {
    res.json({message: "Profile route works"});
});

module.exports = router;