// Router to expose end points for consumers

const express = require("express");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middlewares/jwt");
const { signUp, logIn } = require("../controllers/user");
//Creating a router instance using express
const router = express.Router();
const customMessage = "Malformed Request";
const statusCode = "400";

/**
 * @route /api/user-services/log-in
 * @requires emailId,password
 * @description Queries the db with email id (unique) and comapres the user password with the saved password,
 * if found same then generates jwt token as response if not then sends negative response
 */
router.post("/log-in", async (req, res, next) => {
  try {
    const controllerResult = await logIn(req.body);
    if (controllerResult.error) {
      throw {
        customMessage: controllerResult.err.message,
      };
    }
    res.status(200).send({
      status: 200,
      message: "Logged in successfully",
      data: controllerResult.token,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route /api/user-services/sign-up
 * @requires emailId,password
 * @description Queries the db with email id (unique) and checks for dupicates if not then saves the new details and generates token
 * to send as response
 */
router.post("/sign-up", async (req, res, next) => {
  try {
    //   Save the request body data in variables
    let { emailId, password, mobilePhone, userName } = req.body;
    // validate the request body if some data is found missing then throw malformed error using common error handler
    if (!emailId || !password || !mobilePhone || !userName) {
      throw { customMessage, statusCode };
    }
    console.log(`Sign up request initiated for email ${emailId}`);
    // Call the controller to process the data and handle token generation
    const controllerResult = await signUp(req.body);
    if (controllerResult.error) {
      // throw the err message as recieved
      throw { customMessage: controllerResult.err.message };
    }
    res.status(200).send({
      status: 200,
      message: "User signed in successfully",
      data: controllerResult.token,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
