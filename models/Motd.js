const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MotdSchema = new Schema({
  motdText: {
    type: String
  },
  motdId: {
    type: String
  }
});

module.exports = Motd = mongoose.model("motd", MotdSchema);
