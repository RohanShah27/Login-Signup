/**
 * @description This function returns the encrypted payload for request
 */

var CryptoJS = require("crypto-js");

export default async (data) => {
  try {
    // aes secret key
    let secretKey = `zvlfSIfNgBQR9EIASJu1`;

    // Encrypting the payload using secret key
    var encryptedData = await CryptoJS.AES.encrypt(
      // data/ payload
      JSON.stringify(data),
      // key for encryption
      secretKey
    ).toString();

    // returning encrypted data as output
    return { error: false, encryptedData };
  } catch (error) {
    return { error: true };
  }
};
