const express = require("express");

const app = express();

app.use(express.json());

let users = {};

app.post("/signup", (req, res) => {
  if (users[req.body.username]) {
    return res.status(400).json({
      message: "User already exists, please sign in.",
    });
  }
  const token = "sdfksfhsdff94df";
  users[req.body.username] = {
    username: req.body.username,
    password: req.body.password,
    token: token,
  };
  return res.status(200).json({
    token,
  });
});

app.post("/signin", (req, res) => {
  if (!users[req.body.username]) {
    return res.status(404).json({
      message: "User not found. Please sign up first.",
    });
  }
  if (users[req.body.username].password !== req.body.password) {
    return res.status(400).json({
      message: "Wrong password.",
    });
  }
  return res.status(200).json({
    token: users[req.body.username].token,
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000.");
});
