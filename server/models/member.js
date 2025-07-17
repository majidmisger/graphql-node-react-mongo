const mongoose = require("./index");

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
