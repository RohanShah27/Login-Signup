const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const users = require("./src/routes/user");
const error = require("./src/middlewares/error");
const mongoose = require("mongoose");
const { decrypt } = require("./src/middlewares/encrypt-decrypt");
//Create an instance of express
const app = express();

app.set("trust-proxy", 1);

// Block all unwanted headers using helmet
app.use(helmet());

// Disable x-powered-by header separately
app.disable("x-powered-by");

//Setup server
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.disable("etag"); //Disables caching
morgan.token("remote-addr", (req) => {
  return req.header("X-Real-IP") || req.ip;
});
app.use(
  morgan("common", { stream: { write: (message) => console.log(message) } })
);

// Connect to the db
mongoose.connect("mongodb://localhost:27017/loginSignup", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
//Connection events to check db connectivity
mongoose.connection.on("connected", function () {
  //Check if port exists in the environment else use 5000
  const port = process.env.PORT || 5000;
  //If the environment is test, do not start the express server
  if (process.env.NODE_ENV !== "test") {
    app
      .listen(parseInt(port.toString()), "0.0.0.0", () => {
        //Listen the express server on the given port and log a message to the logs
        console.log(`Server is listening on port ${port}`);
      })
      .on("error", (err) => {
        //In case of an error, log the error to the logs
        console.log(`at:index.js -> ${JSON.stringify(err)}`);
      });
  }
});

// If the connection throws an error
mongoose.connection.on("error", function (err) {
  console.log({
    message: "Mongoose default connection error: ",
    description: err,
  });
});

// // When the connection is disconnected
mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

//use the exposed endpoints from routes
app.use("/api/user-services", [decrypt], users);
app.use(error);

module.exports = app;
