const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;

const { mongoURI } = require("./config/key");
const { User } = require("./Model/User");

const authorize = require("./middleware/authorize");

//세션
const session = require("express-session");
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

app.use("/api/user/account", require("./routes/account.js"));

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

app.get("/", (req, res) => {
  res.send("Hello World!!!!!!"); //빌드해서 넣어주기
});

//토픽 불러오기
app.post("/api/data/topic/read", (req, res) => {
  User.findOne({ email: req.session.user.email })
    .then((user) => {
      res.status(200).json({ success: true, topics: user.topics });
    })
    .catch(console.log);
});

//토픽추가
app.post("/api/data/topic/create", (req, res) => {
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $push: { topics: [{ topicName: req.body.topicName }] } }
  ).then(() => {
    res.status(200).json({ success: true });
  });
});

//토픽삭제
app.post("/api/data/topic/delete", (req, res) => {
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $pull: { topics: { topicName: req.body.topicName } } }
  ).then(() => {
    res.status(200).json({ success: true });
  });
});

//word 추가
app.post("/api/data/word/create", (req, res) => {
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $push: { words: [req.body] } }
  ) //
    .then(() => {
      console.log("word 추가 완료");

      User.findOne({ email: req.session.user.email }) //
        .then((updatedData) => {
          console.log(updatedData.words);
          res.status(200).json({ success: true, newWords: updatedData.words });
        });
    })
    .catch(console.log);
});

//word 삭제
app.post("/api/data/word/delete", (req, res) => {
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $pull: { words: { _id: req.body.id } } }
  ) //
    .then(() => {
      console.log("word 삭제 완료");
      res.status(200).json({ success: true });
    })
    .catch(console.log);
});

//word 불러오기
app.post("/api/data/word/read", (req, res) => {
  User.findOne({ email: req.session.user.email }) //
    .then((user) => {
      res.status(200).json({
        success: true,
        words: user.words.filter((word) => word.topic === req.body.topic),
      });
    })
    .catch(console.log);
});

//home 로그인여부 검사
app.get("/api/home", authorize, (req, res) => {
  //user는 로그인시 생성한 객체
  res.status(200).json({ success: true, userInfo: req.session.user });
});

//할거. word 데이터입출력, 세션유지 선택 안내
