const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const { User } = require("../Model/User");

//로그인
router.post("/login", authenticate, (req, res) => {
  //세션활성화
  const userSession = { email: req.body.email, name: req.body.name };
  req.session.user = userSession; // session에 user객체 생성
  res.status(200).json({ msg: "로그인성공" });
});

//로그아웃
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(400).json({ success: false, msg: "로그아웃 실패~!" });
      return;
    }
    res.status(200).json({ success: true, msg: "로그아웃 성공" });
  });
});

//회원가입
router.post("/register", (req, res) => {
  const temp = {
    name: req.body.name,
    email: req.body.email,
    pw: req.body.pw,
  };
  const user = new User(temp);
  user
    .save()
    .then(() => {
      //세션 활성화(for 자동로그인)
      const userSession = { email: temp.email, name: temp.name };
      req.session.user = userSession; // session에 user객체 생성
      res.status(200).json({ success: true, msg: "등록성공" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, msg: "등록실패", error: err });
    });
});

module.exports = router;
