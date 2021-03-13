const express = require("express");
const mongoose = require("mongoose");

//Schema for Users
let User = new mongoose.Schema(
  {
    user_name: { type: String },
    email_id: { type: String },
    mobile_number: { type: String },
    password: { type: String },
    creationTime: { type: Date, default: new Date() },
  },
  { collection: "user" }
);

let userModel = mongoose.model("user", User);
module.exports = userModel;
