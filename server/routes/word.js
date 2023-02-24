const router = require("express").Router();
const { User } = require("../Model/User");
const authorize = require("../middleware/authorize");

router.use(authorize);

router.get("/", (req, res) => {
  User.findOne({ email: req.session.user.email })
    .then((resultData) => {
      res.status(200).json({ words: resultData.words });
    })
    .catch((err) => {
      res.status(500).json({ msg: "단어조회 실패", err });
    });
});

router.post("/", (req, res) => {
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $push: { words: { ...req.body, isMemorized: false, isBookmarked: false } } },
    { new: true }
  )
    .then((resultData) => {
      res.status(201).json({ words: resultData.words });
    })
    .catch((err) => {
      res.status(500).json({ msg: "단어등록 실패", err });
    });
});

router.patch("/:_id", (req, res) => {
  const updateObj = {};
  Object.keys(req.body).forEach((key) => {
    updateObj[`words.$[wordsFilter].${key}`] = req.body[key];
  });
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $set: updateObj },
    { arrayFilters: [{ "wordsFilter._id": req.params._id }], new: true }
  )
    .then((resultData) => {
      if (resultData === null) return res.status(400).json({});
      res.status(200).json({ words: resultData.words });
    })
    .catch((err) => {
      res.status(500).json({ msg: "단어수정 실패", err });
    });
});

router.delete("/:_id", (req, res) => {
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $pull: { words: { _id: req.params._id } } },
    { new: true }
  )
    .then((resultData) => {
      res.status(200).json({ words: resultData.words });
    })
    .catch((err) => {
      res.status(500).json({ msg: "단어삭제 실패", err });
    });
});

module.exports = router;
