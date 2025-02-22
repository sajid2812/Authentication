const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

function auth(req, res, next) {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(400).json({ message: "Missing token in header." });
    }
    const decodedInfo = jwt.verify(token, JWT_SECRET);
    if (!decodedInfo || !decodedInfo.username) {
      return res.status(400).json({ message: "Invalid token." });
    }
    req.username = decodedInfo.username;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token." });
  }
}

const JWT_SECRET = "sajidlovesspiderman";
let users = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

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

app.get("/user-profile", auth, (req, res) => {
  const foundUser = users.find((user) => user.username === req.username);
  if (!foundUser) {
    return res.status(400).json({
      message: "Invalid token.",
    });
  }
  return res.status(200).json({
    username: foundUser.username,
    password: foundUser.password,
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000.");
});
