const router = require("express").Router();
const { User } = require("../Model/User");

//word 불러오기
router.get("/", (req, res) => {
  User.findOne({ email: req.session.user.email }) //
    .then((user) => {
      res.status(200).json({
        success: true,
        words: user.words.filter((word) => word.topic === req.query.topic),
      });
    })
    .catch(console.log);
});

//word 추가
router.post("/", (req, res) => {
  console.log(req.body);
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $push: { words: req.body } },
    { new: true }
  ) //
    .then((updatedData) => {
      const newWords = updatedData.words.filter(
        (word) => word.topic === req.body.topic
      );
      res.status(200).json({ success: true, newWords });
    })
    .catch(console.log);
});

//word 수정
router.patch("/:_id", (req, res) => {
  User.findOneAndUpdate(
    {
      email: req.session.user.email,
      "words._id": req.params._id,
    },
    {
      $set: {
        "words.$": req.body,
      },
    },
    { new: true }
  ) //
    .then((data) => {
      if (data === null) return res.status(400).json({ success: false });
      res.status(200).json({ success: true });
    })
    .catch(console.log);
}); //

//word 삭제
router.delete("/:_id", (req, res) => {
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $pull: { words: { _id: req.params._id } } }
  ) //
    .then(() => {
      console.log("word 삭제 완료");
      res.status(200).json({ success: true });
    })
    .catch(console.log);
});

module.exports = router;
