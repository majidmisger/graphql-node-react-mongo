const mongoose = require("./index");

// Define Member schema
const applicationsSchema = new mongoose.Schema({
  name: String,
  category: String,
  icon: String,
  email_auth: String
});

const APPLICATION = mongoose.model("applications", applicationsSchema);
module.exports = { APPLICATION };
