const express = require("express");

const app = express();

app.use(express.json());

let users = [];

app.post("/signup", (req, res) => {
  const existingUser = users.find((user) => {
    return user.username === req.body.username;
  });
  if (existingUser) {
    return res.status(400).json({
      message: "User already exists, please sign in.",
    });
  }
  users.push({
    username: req.body.username,
    password: req.body.password,
  });
  const token = Math.random() + "sdfksfhsdff94df";
  return res.status(200).json({
    token,
  });
});

app.post("/signin", (req, res) => {
  const existingUser = users.find((user) => {
    return user.username === req.body.username;
  });

  if (!existingUser) {
    return res.status(404).json({
      message: "User not found. Please sign up first.",
    });
  }
  if (existingUser.password !== req.body.password) {
    return res.status(400).json({
      message: "Wrong password.",
    });
  }
  const token = Math.random() + "sdfksfhsdff94df";
  return res.status(200).json({
    token,
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000.");
});
