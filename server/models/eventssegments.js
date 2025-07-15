const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/aiproddb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connected to MongoDB");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Define event property schema
const eventParamSchema = new mongoose.Schema({
  name: String,
  type: String
}, { _id: false });

// Define event schema
const eventSchema = new mongoose.Schema({
  event: String,
  displayname: String,
  clientname: String,
  list: [eventParamSchema],
  isDisplay: { type: Boolean, default: true },
  journey: { type: String, default: null }
}, { _id: false });

// Define the main eventSegments schema
const eventSegmentsSchema = new mongoose.Schema({
  clist: [mongoose.Schema.Types.Mixed],
  events: [eventSchema],
  updatedAt: Number
});

const EventSegments = mongoose.model("eventsegments", eventSegmentsSchema);

module.exports = { EventSegments };
