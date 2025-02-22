const jwt = require("jsonwebtoken");

const JWT_SECRET = "iamsksajid";

let token = "";

function signJWT() {
  token = jwt.sign("Hello World!", JWT_SECRET);
}


function verifyJWT(token) {
    try {
      jwt.verify(token, JWT_SECRET);
      return true;
    } catch (err) {
      return false;
    }
  }
  

