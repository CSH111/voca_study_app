const router = require("express").Router();
const { User } = require("../Model/User");

//word 불러오기
router.get("/word", (req, res) => {
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
router.post("/word", (req, res) => {
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

//word 수정 - 단어
router.patch("/word/:_id", (req, res) => {
  console.log(req.body.word, req.body.meaning);
  User.findOneAndUpdate(
    { email: req.session.user.email, "words._id": req.params._id },
    {
      $set: {
        "words.$.word": req.body.word, //
        "words.$.meaning": req.body.meaning,
      },
    },
    { new: true }
  ) //
    .then((updatedData) => {
      res.status(200).json({ success: true, newWords: updatedData.words });
    })
    .catch(console.log);
}); //

//word 삭제
router.delete("/word/:_id", (req, res) => {
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
