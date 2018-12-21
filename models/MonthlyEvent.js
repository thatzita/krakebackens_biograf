const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MonthlyEventSchema = new Schema({
  eventType: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  background: {
    type: String
  },
  poster: {
    type: String
  },
  description: {
    type: String
  },
  monEventMessage: {
    type: String
  },
  screeningDate: {
    type: String,
    required: true
  },
  screeningTime: {
    type: String,
    required: true
  },
  utc_time: {
    type: String,
    required: true
  },
  cancel_utc_time: {
    type: String,
    required: true
  },
  reminder_utc_time: {
    type: String,
    required: true
  },
  seating: {
    type: Array,
    required: true
  },
  event_id: { type: String },
  fullyBooked: Boolean,
  crowRating: String
});

module.exports = MonEvent = mongoose.model("monthlyevent", MonthlyEventSchema);

let MonEventArchive = mongoose.model(
  "monthlyEventsArchives",
  MonthlyEventSchema
);

module.exports = {
  MonEvent: MonEvent,
  MonEventArchive: MonEventArchive
};
