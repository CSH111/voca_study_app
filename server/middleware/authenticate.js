const { User } = require("../Model/User");
const bcrypt = require("bcrypt");

function authenticate(req, res, next) {
  const temp = {
    email: req.body.email,
    pw: req.body.pw,
  };

  User.findOne({ email: temp.email })
    .exec()
    .then((doc) => {
      if (!doc) {
        res.status(401).json({ msg: "존재하지 않는 아이디입니다.", errName: "noEmail" });
        return;
      }
      bcrypt.compare(temp.pw, doc.pw, (err, result) => {
        if (!result) {
          res.status(401).json({ msg: "비밀번호가 다릅니다.", errName: "wrongPw" });
          return;
        }
        // 미들웨어에서 값을 next로 전달하고 싶을때 req.객체생성
        req.body.name = doc.name;
        next();
      });
    }) //
    .catch(() => {
      res.status(500).json({ msg: "로그인실패" });
    });
}

module.exports = authenticate;
