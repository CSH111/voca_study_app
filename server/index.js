require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const { User } = require("./Model/User");
const authenticate = require("./middleware/authenticate");
const authorize = require("./middleware/authorize");

const topicRouter = require("./routes/topic");
const wordRouter = require("./routes/word");
const sessionRouter = require("./routes/session");
//세션
const session = require("express-session");
const mongoURI = process.env.MONGO_URI;
const MongoDBStore = require("connect-mongo");
const mongoDBstore = MongoDBStore.create({
  mongoUrl: mongoURI,
  collectionName: "mySessions",
});
const MAX_AGE = 1000 * 60 * 60 * 24 * 30; // 1month
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (origin === process.env.CLIENT_URL) {
      callback(null, true);
      return;
    }
    callback(new Error("Not allowed by CORS"));
  },
};

app.use(
  session({
    secret: "secret",
    name: "session-id",
    store: mongoDBstore,
    rolling: true,
    //
    cookie: {
      maxAge: MAX_AGE,
      sameSite: false,
      secure: false,
    },
    // resave: true,
    resave: false,
    //resave DB에 이미존재하는 세션에 대해 재저장 할지 여부
    saveUninitialized: false,
    //saveUninitialized:true => session이 initialized되지 않더라도 저장소에 저장및 쿠키에 담아전송
    //saveUninitialized:false => session이 initialized되지 않으면 아무작업도 수행하지 않음
    // req.session.myProperty = 123, 이런식으로 수정할 때 이니셜라이즈드상태가됨
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use("/api/topic", topicRouter);
app.use("/api/word", wordRouter);
app.use("/api/session", sessionRouter);

app.listen(port, () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log(`Example app listening on port ${port}
      `);
      console.log("mongoDB connected!");
    })
    .catch(console.log);
});

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
      const userSession = { email: temp.email, name: temp.name };
      req.session.user = userSession;
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

app.get("/api/user", authorize, (req, res) => {
  req.session.touch();

  res.status(200).json({ success: true, userName: req.session.user.name });
});
