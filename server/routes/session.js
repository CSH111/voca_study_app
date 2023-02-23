const router = require("express").Router();
const authenticate = require("../middleware/authenticate");

//로그인
router.post("/", authenticate, (req, res) => {
  //세션활성화

  const userSession = { email: req.body.email, name: req.body.name };
  req.session.user = userSession;

  // express-session에 의해 브라우저에 세션이 생성
  //
  // req.session 에 하위 객체(user)를 만들었을 때 DB에 세션 생성
  // req.session 를 수정함으로써 session객체를 initialized 상태로 만들어줌
  // initialized된 세션객체는 쿠키로(sessionID만) 전송되고 DB에 session데이터가 저장(갱신)됨
  //
  // session의 하위객체(user) 존재여부에 따라 authorize 가능(DB에 저장된 user를 가져오기때문)
  //(authenticate 통과한 세션만 user를 가지고 있기 때문)
  // session의 하위 객체내용에 따라 필요 데이터 전송가능

  res.status(200).json({ msg: "로그인성공", userName: userSession.name });
});

//로그아웃
router.delete("/", (req, res) => {
  req.session.destroy((err) => {
    //DB의 세션 데이터를 삭제
    if (err) {
      res.status(500).json({ msg: "로그아웃 실패" });
      return;
    }
    res.status(200).json({ msg: "로그아웃 성공" });
  });
});

module.exports = router;
