const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
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
  morgan("common", { stream: { write: (message) => httpLogger.http(message) } })
);

//TODO add condition to check for db avaibility
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
      console.log(JSON.stringify(err));
    });
}
