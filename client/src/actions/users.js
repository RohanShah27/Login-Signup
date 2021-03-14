const API_URL = "http://localhost:5000/api";

/**
 *
 * @param {*} encryptedData
 * @description action to call server to log in user
 */
const logInUser = async (encryptedData) => {
  try {
    console.log("encryptedData: ", encryptedData);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ encryptedData }),
    };
    let responseObj = {
      error: false,
    };
    await fetch(`${API_URL}/user-services/log-in`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== 200) {
          responseObj.error = true;
        } else {
          responseObj.error = false;
          //   Save token in local storage and redirect user to success screen
          localStorage.setItem("token", data.data);
          window.location.href = "/success";
        }
        responseObj.message = data.message;
      })
      .catch((err) => {
        responseObj.error = true;
        responseObj.message = err.response.message
          ? err.response.message
          : "Something went wrong please try again later";
      });
    return responseObj;
  } catch (err) {
    return {
      error: true,
      message: "Something went wrong please try again later",
    };
  }
};

/**
 *
 * @param {*} encryptedData
 * @description action to call server to sign up user
 */
const signUp = async (encryptedData) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ encryptedData }),
    };
    let responseObj = {
      error: false,
    };
    await fetch(`${API_URL}/user-services/sign-up`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== 200) {
          responseObj.error = true;
        } else {
          responseObj.error = false;
          //   Save token in local storage and redirect user to success screen
          localStorage.setItem("token", data.data);
          window.location.href = "/success";
        }
        responseObj.message = data.message;
      })
      .catch((err) => {
        console.log("err: ", err);
        responseObj.error = true;
        responseObj.message = err.response.message
          ? err.response.message
          : "Something went wrong please try again later";
      });
    return responseObj;
  } catch (err) {
    return {
      error: true,
      message: "Something went wrong please try again later",
    };
  }
};

module.exports = {
  logInUser,
  signUp,
};
