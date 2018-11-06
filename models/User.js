const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  // name: {
  //     type: String,
  // },
  // surname: {
  //     type: String,
  // },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  vip: {
    status: { type: Boolean },
    seat: { type: String }
  },
  stats: {
    total: { type: Number },
    season: { type: Number }
  },
  moviesViewed: []
});

module.exports = User = mongoose.model("users", UserSchema);
