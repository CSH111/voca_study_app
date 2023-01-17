const router = require("express").Router();
const authorize = require("../middleware/authorize");
const { User } = require("../Model/User");

router.get("/", (req, res) => {
  User.findOne({ email: req.session.user.email })
    .then((resultData) => {
      res.status(200).json({ success: true, topics: resultData.topics });
    })
    .catch(console.log); //세션없을 때 불필요한 에러 출력->해결요망
});

//토픽추가
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

//토픽삭제
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

//토픽수정
router.patch("/:_id", (req, res) => {
  User.findOneAndUpdate(
    {
      email: req.session.user.email,
      "topics._id": req.params._id,
      "words?.topicID": req.params._id,
    },
    {
      $set: {
        "topics.$.topicName": req.body.topicName,
        "words.$[elem].topic": req.body.topicName,
      },
    },
    { arrayFilters: [{ "elem.topicID": req.params._id }], multi: true, new: true }
  )
    .then((resultData) => {
      const { topics, words } = resultData;
      res.status(200).json({ success: true, topics, words });
    })
    .catch(console.log);
});

module.exports = router;
