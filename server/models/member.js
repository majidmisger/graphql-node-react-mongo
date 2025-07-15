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
const memberSchema = new mongoose.Schema({
  username: String,
  email: String,
  api_key: String,
  global_admin: Boolean,
  approvedAppids: [String],
  current_login_time: String,
  previous_login_time: String,
});

const Member = mongoose.model("users", memberSchema);
module.exports = { Member };
