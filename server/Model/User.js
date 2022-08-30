const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requied: true,
  },
  email: {
    type: String,
    unique: 1,
    requied: true,
  },
  pw: {
    type: String,
    requied: true,
  },
});
const User = mongoose.model("user", userSchema);

module.exports = { User };
