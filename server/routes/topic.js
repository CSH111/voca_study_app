const router = require("express").Router();
const authorize = require("../middleware/authorize");
const { User } = require("../Model/User");

router.get("/", (req, res) => {
  User.findOne({ email: req.session.user.email })
    .then((resultData) => {
      res.status(200).json({ success: true, topics: resultData.topics });
    })
    .catch(console.log);
});

router.post("/", authorize, (req, res) => {
  const { topicName, lang } = req.body;
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $push: { topics: { topicName, lang } } },
    { new: true }
  )
    .then((resultData) => {
      res.status(200).json({ success: true, topics: resultData.topics });
    })
    .catch(console.log);
});

router.delete("/:_id", (req, res) => {
  User.findOneAndUpdate(
    { email: req.session.user.email },
    {
      $pull: {
        topics: { _id: req.params._id },
        words: { topicID: req.params._id },
      },
    },
    { new: true }
  )
    .then((resultData) => {
      const { topics, words } = resultData;
      res.status(200).json({ success: true, topics, words });
    })
    .catch(console.log);
});

router.patch("/:_id", (req, res) => {
  const updateObj = {};
  Object.keys(req.body).forEach((key) => {
    updateObj[`topics.$[topicsFilter].${key}`] = req.body[key];
    updateObj[`words.$[wordsFilter].${key === "topicName" ? "topic" : key}`] = req.body[key];
  });
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $set: updateObj },
    {
      arrayFilters: [
        { "wordsFilter.topicID": req.params._id },
        { "topicsFilter._id": req.params._id },
      ],
      multi: true,
      new: true,
    }
  )
    .then((resultData) => {
      const { topics, words } = resultData;
      res.status(200).json({ success: true, topics, words });
    })
    .catch(console.log);
});

module.exports = router;
