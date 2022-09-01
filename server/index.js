const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;

const { mongoURI } = require("./config/key");
const { User } = require("./Model/User");
const bcrypt = require("bcrypt");
//세션
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const MAX_AGE = 1000 * 60 * 60 * 24 * 365; // 1year
const mongoDBstore = new MongoDBStore({
  uri: mongoURI,
  collection: "mySessions",
});

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

app.get("/", (req, res) => {
  res.send("Hello World!!!!!!");
});

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
app.post("/api/register", (req, res) => {
  const temp = {
    name: req.body.name,
    email: req.body.email,
    pw: req.body.pw,
  };
  const user = new User(temp);
  user
    .save()
    .then(() => {
      res.status(200).json({ success: true, msg: "등록성공" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, msg: "등록실패", error: err });
    });
});

//home 로그인여부
app.get("/api/home", (req, res) => {
  console.log(req.session);
  res.status(200).json({ success: true, userInfo: req.session.user });
});

//로그인
app.post("/api/login", (req, res) => {
  const temp = {
    email: req.body.email,
    pw: req.body.pw,
  };
  User.findOne({ email: temp.email })
    .exec()
    .then((doc) => {
      if (!doc) {
        res.status(400).json({ msg: "존재하지 않는 아이디입니다." });
        return;
      }
      return doc; //
    }) //
    .then((doc) => {
      bcrypt.compare(temp.pw, doc.pw, (err, result) => {
        if (!result) {
          res.status(400).json({ msg: "비밀번호가 다릅니다." });
          return;
        }
        const userSession = { email: doc.email, name: doc.name };
        req.session.user = userSession;
        res.status(200).json({ msg: "로그인성공", userName: doc.name });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, msg: "로그인실패" });
    });
});

//logout
app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(400).json({ success: false, msg: "로그아웃 실패" });
      return;
    }
    res.status(200).json({ success: true, msg: "로그아웃 성공" });
  });
});

//할거. 비밀번호 암호화, authorization
