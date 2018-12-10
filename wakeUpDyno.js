const http = require("http"); //importing http

const options = {
  host: "krakebackensbiograf.herokuapp.com",
  port: 80,
  path: "/WAKEUP_DYNO"
};
console.log("============VÄCK SERVERN============");
http
  .get(options, function(res) {
    res.on("data", function(chunk) {
      try {
        console.log("============SERVERN HAR VAKNAT============" + chunk);
      } catch (err) {
        console.log(err.message);
      }
    });
  })
  .on("error", function(err) {
    console.log("Error: " + err.message);
  });
