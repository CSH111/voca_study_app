const router = require("express").Router();
const { User } = require("../Model/User");

router.get("/", (req, res) => {
  User.findOne({ email: req.session.user.email })
    .then((resultData) => {
      res.status(200).json({ success: true, words: resultData.words });
    })
    .catch(console.log);
});

router.post("/", (req, res) => {
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $push: { words: { ...req.body, isMemorized: false, isBookmarked: false } } },
    { new: true }
  )
    .then((resultData) => {
      res.status(200).json({ success: true, words: resultData.words });
    })
    .catch(console.log);
});

router.patch("/:_id", (req, res) => {
  const updateObj = {};
  Object.keys(req.body).forEach((key) => {
    updateObj[`words.$[wordsFilter].${key}`] = req.body[key];
  });
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $set: updateObj },
    { arrayFilters: [{ "wordsFilter._id": req.params._id }], new: true, multi: true }
  )
    .then((resultData) => {
      if (resultData === null) return res.status(400).json({ success: false });
      res.status(200).json({ success: true, words: resultData.words });
    })
    .catch(console.log);
});

router.delete("/:_id", (req, res) => {
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $pull: { words: { _id: req.params._id } } },
    { new: true }
  )
    .then((resultData) => {
      res.status(200).json({ success: true, words: resultData.words });
    })
    .catch(console.log);
});

module.exports = router;
