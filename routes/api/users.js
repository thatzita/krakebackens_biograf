const express = require("express");
const router = express.Router();

//router kommer användas istället för app.get

//GET api/users/test
router.get("/test", (req, res) => {
    res.json({message: "User route works"});
});

module.exports = router;