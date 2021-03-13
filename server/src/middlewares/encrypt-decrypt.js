const CryptoJS = require("crypto-js");
// const config = require("config");

// ENCRYPTION KEY
var key = "zvlfSIfNgBQR9EIASJu1";
const encrypt = (data) => {
  // Encrypt the data and convert to string
  var cipher = CryptoJS.AES.encrypt(data, key);
  cipher = cipher.toString();
  return cipher;
};

const decrypt = (req, res, next) => {
  try {
    //check if body has param as encrypted data
    if (!req.body.encryptedData) {
      //if  not throw error
      throw {};
    }
    // decrypt and convert to UTF8
    var decipher = CryptoJS.AES.decrypt(req.body.encryptedData, key);
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    //parse string to JSON and execute the next function
    req.body = JSON.parse(decipher);
    next();
  } catch (err) {
    // send error if something goes wrong
    res.status(400).send({
      status: 406,
      message: "Key possibly incorrect",
    });
    console.log("at:middlewares/encrypt-decrypt/decrypt", err);
  }
};

module.exports = { encrypt, decrypt };
