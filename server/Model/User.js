const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const topicSchema = new mongoose.Schema({
  topicName: {
    type: String,
    required: true,
  },
});

const wordSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  topicID: {
    type: String,
    required: true,
  },
  word: {
    type: String,
    required: true,
  },
  meaning: {
    type: String,
    required: true,
  },
  isMemorized: {
    type: Boolean,
    required: true,
  },
  isBookmarked: {
    type: Boolean,
    required: true,
  },
});
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: 1,
    required: true,
  },
  pw: {
    type: String,
    required: true,
  },
  // topics: {},
  topics: [topicSchema],
  words: [wordSchema],
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
