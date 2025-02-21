const express = require("express");

const app = express();

app.use(express.json());

let users = [];

function generateToken(length) {
  const alphaNumeric =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += alphaNumeric.charAt(
      Math.floor(Math.random() * alphaNumeric.length)
    );
  }
  return token;
}

app.post("/signup", (req, res) => {
  const existingUser = users.find((user) => {
    return user.username === req.body.username;
  });
  if (existingUser) {
    return res.status(400).json({
      message: "User already exists, please sign in.",
    });
  }
  const token = generateToken(64);
  users.push({
    username: req.body.username,
    password: req.body.password,
    token: token,
  });
  return res.status(200).json({
    token,
  });
});

app.post("/signin", (req, res) => {
  const existingUser = users.find((user) => {
    return (
      user.username === req.body.username && user.password === req.body.password
    );
  });
  if (!existingUser) {
    return res.status(400).json({
      message: "Invalid username or password.",
    });
  }
  const token = generateToken(64);
  existingUser.token = token;
  return res.status(200).json({
    token,
  });
});

app.get("/user-profile", (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(400).json({
      message: "Missing token in header.",
    });
  }
  const existingUser = users.find((user) => {
    return user.token === token;
  });
  if (!existingUser) {
    return res.status(404).json({
      message: "Invalid token.",
    });
  }
  return res.status(200).json({
    username: existingUser.username,
    password: existingUser.password,
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000.");
});
