const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/aiproddb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connected to MongoDB");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});


// Define Member schema
const applicationsSchema = new mongoose.Schema({
  name: String,
  category: String,
  icon: String,
  email_auth: String
});

const APPLICATION = mongoose.model("applications", applicationsSchema);
module.exports = { APPLICATION };
