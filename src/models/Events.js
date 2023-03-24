const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const EventsSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    type: String,
    required: true,
  },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

const EventtColl = mongoose.model("events", EventsSchema);
module.exports = EventtColl;
