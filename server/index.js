const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;

const { mongoURI } = require("./config/key");
const { User } = require("./Model/User");
const authenticate = require("./middleware/authenticate");
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

//회원가입
app.post("/api/user", (req, res) => {
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

//로그인
app.post("/api/login", authenticate, (req, res) => {
  //세션활성화
  //

  const userSession = { email: req.body.email, name: req.body.name };
  req.session.user = userSession; // session에 user객체 생성
  res.status(200).json({ msg: "로그인성공" });
});

//로그아웃
app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(400).json({ success: false, msg: "로그아웃 실패~!" });
      return;
    }
    res.status(200).json({ success: true, msg: "로그아웃 성공" });
  });
});

//토픽 불러오기
app.get("/api/topic", (req, res) => {
  User.findOne({ email: req.session.user.email })
    .then((user) => {
      res.status(200).json({ success: true, topics: user.topics });
    })
    .catch(console.log); //세션없을 때 불필요한 에러 출력->해결요망
});

//토픽추가
app.post("/api/topic", (req, res) => {
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $push: { topics: [{ topicName: req.body.topicName }] } }
  ).then(() => {
    res.status(200).json({ success: true });
  });
});

//토픽삭제
app.delete("/api/topic/:_id", (req, res) => {
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $pull: { topics: { _id: req.params._id } } }
  )
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch(console.log);
});

//word 추가
app.post("/api/word", (req, res) => {
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

//word 수정 - isMemorizes
app.post("/api/data/word/update", (req, res) => {
  User.findOne({ email: req.session.user.email }) //
    .then((user) => {
      user.words;
    });

  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $push: { words: [req.body] } },
    { new: true }
  ) //
    .then((updatedData) => {
      res.status(200).json({ success: true, newWords: updatedData.words });
    })
    .catch(console.log);
});

//word 삭제
app.delete("/api/word/:_id", (req, res) => {
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $pull: { words: { _id: req.params.id } } }
  ) //
    .then(() => {
      console.log("word 삭제 완료");
      res.status(200).json({ success: true });
    })
    .catch(console.log);
});

//word 불러오기
app.get("/api/word", (req, res) => {
  User.findOne({ email: req.session.user.email }) //
    .then((user) => {
      console.log(user.words.filter((word) => word.topic === req.query.topic));
      res.status(200).json({
        success: true,
        words: user.words.filter((word) => word.topic === req.query.topic),
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

//rest API 제대로 설계
// 회원가입
// POST:: /api/user

//로그인
// POST:: /api/login

//로그아웃
// POST:: /api/logout

//토픽생성
// POST:: /api/topic

//모든토픽 불러오기
// GET:: /api/topic

//토픽 삭제
// DELETE:: /api/topic

//단어 생성
// POST:: /api/word (body:토픽id)

//모든단어 불러오기
// GET:: /api/word

//단어 삭제
// DELETE:: api/word/id

//단어 수정
// PUT:: api/word/id
