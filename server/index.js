require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const { User } = require("./Model/User");
const authenticate = require("./middleware/authenticate");
const authorize = require("./middleware/authorize");

const topicRouter = require("./routes/topic");
const wordRouter = require("./routes/word");
//세션
const session = require("express-session");
const mongoURI = process.env.MONGO_URI;
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoDBstore = new MongoDBStore({
  uri: mongoURI,
  collection: "mySessions",
});

const MAX_AGE = 1000 * 60 * 60 * 24 * 365; // 1year
app.use(
  session({
    secret: "secret",
    name: "session-id",
    store: mongoDBstore,
    cookie: {
      maxAge: MAX_AGE,
      sameSite: false,
      secure: false,
    },
    resave: true,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ exrended: true }));

app.use("/api/topic", topicRouter);
app.use("/api/word", wordRouter);

app.listen(port, () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log(`Example app listening on port ${port}
      http://localhost:${port}/
      `);
      console.log("mongoDB connected!");
    })
    .catch(console.log);
});

//회원가입
app.post("/api/user", (req, res) => {
  const temp = {
    name: req.body.name === "" ? req.body.email.split("@")[0] : req.body.name,
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
      res.status(200).json({ success: true, msg: "등록성공", userName: temp.name });
    })
    .catch((err) => {
      let msg = "회원가입 실패";
      if (err.code === 11000) {
        msg = "이미 등록된 이메일입니다.";
      }
      res.status(400).json({ success: false, msg, error: err });
    });
});

//로그인
app.post("/api/session", authenticate, (req, res) => {
  //세션활성화

  const userSession = { email: req.body.email, name: req.body.name };
  req.session.user = userSession;

  // express-session에 의해 브라우저에 세션이 생성

  // req.session 에 하위 객체(user)를 만들었을 때 DB에 세션 생성
  // session의 하위객체(user) 존재여부에 따라 authorize 가능
  //(authenticate 통과한 세션만 user를 가지고 있기 때문)
  //  + auth후 클라이언트에서 리다이렉트 처리ㄱㄱ(별수없는듯)
  // session의 하위 객체내용에 따라 필요 데이터 전송가능

  res.status(200).json({ msg: "로그인성공", userName: userSession.name });
});

//로그아웃
app.delete("/api/session", (req, res) => {
  req.session.destroy((err) => {
    //DB의 세션 데이터를 삭제
    if (err) {
      res.status(400).json({ success: false, msg: "로그아웃 실패" });
      return;
    }
    res.status(200).json({ success: true, msg: "로그아웃 성공" });
  });
});

//home 유저데이터 전송
app.get("/api/user", authorize, (req, res) => {
  //user는 로그인시 생성한 객체
  res.status(200).json({ success: true, userName: req.session.user.name });
});
