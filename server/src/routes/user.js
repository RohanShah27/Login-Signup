// Router to expose end points for consumers

const express = require("express");

//Creating a router instance using express
const router = express.Router();
const customMessage = "Malformed Request";
const statusCode = "400";
router.post("/login", async (req, res, next) => {
  try {
    //   Save the request body data in variables
    let { userName, password } = req.body;
    // validate the request body if some data is found missing then throw malformed error using common error handler
    if (!userName || !password) {
      throw { customMessage, statusCode };
    }
    console.log(
      `Request initiated to log the user with ${JSON.stringify(req.body)}`
    );
  } catch (err) {
    next(err);
  }
});

module.exports = router;
