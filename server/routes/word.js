const router = require("express").Router();
const { User } = require("../Model/User");

//word 불러오기
router.get("/", (req, res) => {
  User.findOne({ email: req.session.user.email }) //
    .then((resultData) => {
      res.status(200).json({ success: true, words: resultData.words });
    })
    .catch(console.log);
});

//word 추가
router.post("/", (req, res) => {
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $push: { words: { ...req.body, isMemorized: false, isBookmarked: false } } },
    { new: true }
  ) //
    .then((resultData) => {
      res.status(200).json({ success: true, words: resultData.words });
    })
    .catch(console.log);
});

//word 수정
router.patch("/:_id", (req, res) => {
  User.findOneAndUpdate(
    {
      $and: [
        { email: req.session.user.email },
        { words: { $elemMatch: { _id: req.params._id } } },
        // "words._id": req.params._id,
      ],
    },
    {
      $set: {
        "words.$": req.body,
      },
    },
    { new: true }
  ) //
    .then((resultData) => {
      // res.status(400).json({ success: true, words: resultData.words });

      if (resultData === null) return res.status(400).json({ success: false });
      res.status(200).json({ success: true, words: resultData.words });
    })
    .catch(console.log);
}); //

//word 삭제
router.delete("/:_id", (req, res) => {
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $pull: { words: { _id: req.params._id } } },
    { new: true }
  ) //
    .then((resultData) => {
      res.status(200).json({ success: true, words: resultData.words });
    })
    .catch(console.log);
});

module.exports = router;
