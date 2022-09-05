const mongoose = require("mongoose");

const Topic = mongoose.model("topic", topicSchema);

module.exports = { Topic };
