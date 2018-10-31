const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

//mongoose för att hitta användaren
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

//https://www.npmjs.com/package/passport-jwt
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user); //första är för error vilket vi inte får
          }
          return done(null, false); //första är error vilket vi inte får, utan vi har ingen användare
        })
        .catch(err => {
          if (err) throw err;
        });
    })
  );
};
