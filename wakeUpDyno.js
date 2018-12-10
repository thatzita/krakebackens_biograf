const http = require("http"); //importing http

const options = {
  host: "krakebackensbiograf.herokuapp.com",
  port: 80,
  path: "/WAKEUP_DYNO"
};
console.log("======WAKUP DYNO START");
http
  .get(options, function(res) {
    res.on("data", function(chunk) {
      try {
        console.log("======WAKUP DYNO: HEROKU RESPONSE: " + chunk);
      } catch (err) {
        console.log(err.message);
      }
    });
  })
  .on("error", function(err) {
    console.log("Error: " + err.message);
  });
