const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const topicSchema = new mongoose.Schema({
  topicName: {
    type: String,
    requied: true,
  },
});

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
  // topics: {},
  topics: [topicSchema],
});

const saltRounds = 10;

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("pw")) return next();
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.pw, salt, (err, hash) => {
      if (err) return next(err);
      user.pw = hash;
      next();
    });
  });
});

const User = mongoose.model("user", userSchema);

module.exports = { User };
