const jwt = require("jsonwebtoken");
const config = require("config");
// const jwtPrivateKey=config.get("JWT_PRIVATE_KEY");
const jwtPrivateKey = "myKey";

module.exports.generateToken = (payload) => {
  // return the signed jwt token as function response
  return jwt.sign(payload, jwtPrivateKey, {
    //set the token expiry to be 5 minutes
    expiresIn: "5m",
  });
};
