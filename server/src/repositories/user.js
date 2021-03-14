const userModel = require("../db-init/models/user");

const insertUser = async (data) => {
  try {
    let { emailId, password, mobilePhone, userName } = data;
    let user = new userModel({
      user_name: userName,
      email_id: emailId,
      mobile_number: mobilePhone,
      password: password,
    });
    await user.save();
    return { error: false };
  } catch (err) {
    return { error: true };
  }
};

const getUser = async (emailId) => {
  try {
    let user = await userModel.findOne({ email_id: emailId });
    return { error: false, userDetails: user };
  } catch (err) {
    return { error: true };
  }
};
module.exports = { insertUser, getUser };
