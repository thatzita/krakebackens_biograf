const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserStatisticSchema = new Schema({
  seasonUserViewings: {
    type: Number,
    required: true
  },
  seasonTopUsers: {
    type: Array,
    required: true
  },
  archivedDate: {
    type: String,
    required: true
  }
});

module.exports = UserStatistic = mongoose.model(
  "userstatistics",
  UserStatisticSchema
);
