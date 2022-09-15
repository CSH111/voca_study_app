const router = require("express").Router();
const { User } = require("../Model/User");

router.get("/", (req, res) => {
  User.findOne({ email: req.session.user.email })
    .then((user) => {
      res.status(200).json({ success: true, topics: user.topics });
    })
    .catch(console.log); //세션없을 때 불필요한 에러 출력->해결요망
});

//토픽추가
router.post("/", (req, res) => {
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $push: { topics: { topicName: req.body.topicName } } }
  ).then(() => {
    res.status(200).json({ success: true });
  });
});

//토픽삭제
router.delete("/:_id", (req, res) => {
  User.findOneAndUpdate(
    { email: req.session.user.email },
    {
      $pull: {
        topics: { _id: req.params._id },
      },
    }
  )
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch(console.log);
});

module.exports = router;
