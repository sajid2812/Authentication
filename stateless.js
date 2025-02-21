const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const JWT_SECRET = "sajidlovesspiderman";
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
  const token = jwt.sign(
    {
      username: req.body.username,
    },
    JWT_SECRET
  );
  users.push({
    username: req.body.username,
    password: req.body.password,
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
  const token = jwt.sign(
    {
      username: existingUser.username,
    },
    JWT_SECRET
  );
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
  try {
    const decodedInfo = jwt.verify(token, JWT_SECRET);
    const existingUser = users.find((user) => {
      return user.username === decodedInfo.username;
    });
    if (!existingUser) {
      return res.status(400).json({
        message: "Invalid token.",
      });
    }
    return res.status(200).json({
      username: existingUser.username,
      password: existingUser.password,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Invalid token.",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000.");
});
