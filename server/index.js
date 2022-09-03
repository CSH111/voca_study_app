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

app.get("/", (req, res) => {
  res.send("Hello World!!!!!!"); //빌드해서 넣어주기
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
// /api/user/account/register
//회원가입

//home 로그인여부 검사
app.get("/api/home", authorize, (req, res) => {
  //user는 로그인시 생성한 객체
  res.status(200).json({ success: true, userInfo: req.session.user });
});

app.use("/api/user/account", require("./routes/account.js"));

//할거. 라우터적용, word 데이터입출력, 세션유지 선택 안내
