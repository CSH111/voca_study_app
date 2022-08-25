const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ exrended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!!!!!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/api/main", (req, res) => {
  console.log(req.body);
  res.status(200).json({ success: true, msg: "hi" });
});
console.log("hi");
