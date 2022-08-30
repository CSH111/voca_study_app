const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;

const { mongoURI } = require("./config/key");
const { User } = require("./Model/User");

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
  User.create(temp) //
    .then(() => {
      res.status(200).json({ success: true, msg: "등록성공" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, msg: "등록실패", error: err });
    });
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
      if (doc.pw !== temp.pw) {
        res.status(400).json({ msg: "비밀번호가 다릅니다." });
        return;
      }
      res.status(200).json({ msg: "로그인성공" });
    });

  // .catch((err) => {
  //   console.log(err);
  //   res.status(400).json({ success: false, msg: "등록실패" });
  // });
});

//할거. 비밀번호 암호화, authorization
