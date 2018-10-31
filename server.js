const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routes/api/users")
const profile = require("./routes/api/profile")

const app = express();

//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Config for mLab
const db = require("./config/keys").mongoURI;

//Connect to MongoDB with Mongoose
mongoose.connect(db, { useNewUrlParser: true }).then( () =>{
    console.log("Connected to DB");
}).catch( (err) => {
    console.log(err);
});

app.get("/", (req, res) => {
    res.send("Working");
});

//Routes
app.use("/api/users", users);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});