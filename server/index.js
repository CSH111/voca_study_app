const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
// const flash = require("connect-flash");
const { mongoURI } = require("./config/key");
const { User } = require("./Model/User");
const bcrypt = require("bcrypt");
//세션
const session = require("express-session");
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
const MongoDBStore = require("connect-mongodb-session")(session);
const MAX_AGE = 1000 * 60 * 60 * 3; // 3hrs
const mongoDBstore = new MongoDBStore({
  uri: mongoURI,
  collection: "mySessions",
});

app.use(
  session({
    secret: "비밀코드",
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
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());
//
app.use(express.json());
app.use(express.urlencoded({ exrended: true }));

// setting up connect-mongodb-session store

// setting up connect-mongodb-session store

//
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

// passport.serializeUser(function (user, done) {
//   done(null, user.email);
// });

// passport.deserializeUser(function (email, done) {
//   done(null, email);
// });

// //
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "pw",
//       session: true,
//       passReqToCallback: false,
//     },

//     function (입력한아이디, 입력한비번, done) {
//       User.findOne({ email: 입력한아이디 }, function (에러, 결과) {
//         if (에러) return done(에러);

//         if (!결과)
//           return done(null, false, { message: "존재하지않는 아이디요" });

//         결과.comparePassword(입력한비번, (err, isMatch) => {
//           if (!isMatch) return done(null, false, { message: "비번틀렸어요" });
//           return done(null, 결과);
//         });
//       });
//     }
//   )
// );

// app.post(
//   "/api/login",
//   passport.authenticate("local", {
//     successRedirect: "/register",
//     // failureRedirect: "/login1",
//     failureFlash: true,
//   }),
//   (req, res) => {
//     console.log(req.flash());
//     console.log(res);
//     res.status(200).json({ msg: "로그인성공" });
//   }
// );

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

      // if (doc.pw !== temp.pw) {
      //   res.status(400).json({ msg: "비밀번호가 다릅니다." });
      //   return;
      // }
    });

  // .catch((err) => {
  //   console.log(err);
  //   res.status(400).json({ success: false, msg: "등록실패" });
  // });
});

//할거. 비밀번호 암호화, authorization
