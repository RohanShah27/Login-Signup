const bcrypt = require("bcrypt");
const { generateToken } = require("../middlewares/jwt");

const signUp = async (data) => {
  try {
    let { emailId, password } = data;
    //   expects data to have email id and password
    // TODO check db for duplicate email id
    // since no duplicate found create password hash and save in db
    password = await bcrypt.hash(password, 10); //setting the rounds for hashing to be 10
    // now generate a jwt token for the request body
    const token = generateToken(data);
    return {
      error: false,
      token,
    };
  } catch (err) {
    return { error: true, err };
  }
};

module.exports = { signUp };
