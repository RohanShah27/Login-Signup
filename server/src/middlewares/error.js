// common error handling block to handle error for requests
// import { Request, Response, NextFunction } from "express";
//Default function is exported to be a middleware and handle all errors
module.exports = (
  err, // { statusCode: number; customMessage: string }
  req,
  res,
  next
) => {
  //If the err object has a statusCode field, use that or default error code is 500
  //If the err object has a customMessage field, use that or default message is "Please contact the ADMIN"
  //Storing error response in a constant
  const errorResponse = {
    status: err.statusCode ? err.statusCode : 500,
    message: err.customMessage ? err.customMessage : "Please contact the ADMIN",
  };
  //Send the response to the end point consumer
  res.status(errorResponse.status).send(errorResponse);
};
