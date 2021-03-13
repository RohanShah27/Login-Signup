const CryptoJS = require("crypto-js");
// const config = require("config");

// ENCRYPTION KEY
var key = "zvlfSIfNgBQR9EIASJu1";
const encrypt = (data) => {
  var cipher = CryptoJS.AES.encrypt(data, key);
  cipher = cipher.toString();
  return cipher;
};

const decrypt = (req, res, next) => {
  try {
    if (!req.body.encryptedData) {
      throw {};
    }
    var decipher = CryptoJS.AES.decrypt(req.body.encryptedData, key);
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    req.body = JSON.parse(decipher);
    next();
  } catch (err) {
    res.status(400).send({
      status: 406,
      message: "Key possibly incorrect",
    });
  }
};

module.exports = { encrypt, decrypt };
