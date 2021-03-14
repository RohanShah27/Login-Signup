const bcrypt = require("bcrypt");
const { generateToken } = require("../middlewares/jwt");
const { insertUser, getUser } = require("../repositories/user");
const signUp = async (data) => {
  try {
    let { password, emailId } = data;
    //   expects data to have email id and password
    //check db for duplicate email id
    let existingUser = await getUser(emailId);
    if (existingUser.error) {
      throw {
        message: "Something went wrong. Please try again later",
      };
    }
    if (existingUser.userDetails) {
      throw {
        message: "Duplicate user found having same email address",
      };
    }
    // since no duplicate found create password hash and save in db
    password = await bcrypt.hash(password, 10); //setting the rounds for hashing to be 10
    // call repo to save user in db and then generate token
    data.password = password;
    const repoResult = await insertUser(data);
    if (repoResult.error) {
      throw {
        message: "Failed to Sign up user ",
      };
    }
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
