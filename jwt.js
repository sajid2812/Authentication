const jwt = require("jsonwebtoken");

const JWT_SECRET = "iamsksajid";

let token = "";

function signJWT() {
  token = jwt.sign("Hello World!", JWT_SECRET);
}

