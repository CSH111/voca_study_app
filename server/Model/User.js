const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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

userSchema.methods.comparePassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.pw, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

const User = mongoose.model("user", userSchema);

module.exports = { User };
