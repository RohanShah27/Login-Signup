import React, { Component } from "react";
import Form from "../common/Form";
import "../../assets/styles/main-form.css";
import homeImage from "../../assets/images/home.svg";
import encrypt from "../../helpers/encrypt";
import { logInUser, signUp } from "../../actions/users";
export default class LoginSignUp extends Component {
  // Declare the state
  state = {
    selectedOption: "login",
    signupInputs: {
      emailId: {
        value: "",
        label: "Email Id",
        placeHolder: "Enter your email address",
        regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        errorMessage: "Invalid email address format",
      },
      mobilePhone: {
        value: "",
        label: "Mobile Number",
        placeHolder: "Enter your mobile number",
        regex: /^([0-9]{10})?$/,
        errorMessage: "Mobile Number is a 10 digit numeric input",
      },
      userName: {
        label: "User Name",
        placeHolder: "Enter your user name",
        regex: /^[A-Za-z]{0,20}$/,
        errorMessage: "User name cannot contain special characters or numbers",
        value: "",
      },
      password: {
        value: "",
        label: "Password",
        placeHolder: "Enter your password",
        regex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        errorMessage:
          "Password should be minimum 6 character length containing special characters and alphabets",
        type: "password",
      },
    },
    loginInputs: {
      emailId: {
        value: "",
        label: "Email Id",
        placeHolder: "Enter your mobile number",
      },
      password: {
        value: "",
        label: "Password",
        placeHolder: "Enter your password",
        type: "password",
      },
    },
    apiStatus: "",
  };

  /**
   *
   * @param {*} text
   * @param {*} key
   * @description Handles users input on text fields
   */
  handleChange = (text, key) => {
    let currentOption = this.state.selectedOption;
    var inputFields;
    switch (currentOption) {
      case "login":
        // save current state values
        inputFields = { ...this.state.loginInputs };
        inputFields[key].value = text;
        if (inputFields[key].error) {
          this.handleError(this.state.selectedOption);
        }
        // set new state
        this.setState({ loginInputs: inputFields });
        //break the loop
        break;
      case "signup":
        // save current state values
        inputFields = { ...this.state.signupInputs };
        inputFields[key].value = text;
        if (inputFields[key].error) {
          this.handleError(this.state.selectedOption);
        }
        // set new state
        this.setState({ signupInputs: inputFields });
        //break the loop

        break;
      default:
        // default case do nothing
        break;
    }
  };

  /**
   *
   * @param {*} selectedOption
   * @description Handles what should happend when the user clicks on the submit button
   */
  handleSubmitClicked = async (selectedOption) => {
    const errorFlag = this.handleError(selectedOption);
    // only if the error flag is false then call the action
    if (!errorFlag) {
      // generate requestbody
      let requestBody = {};
      let inputs =
        this.state.selectedOption === "login"
          ? { ...this.state.loginInputs }
          : { ...this.state.signupInputs };
      Object.keys(inputs).map((key) => {
        requestBody[key] = inputs[key].value;
      });
      // Encrypt the payload before calling server
      const encryptedData = await encrypt(requestBody);
      if (!encryptedData.error) {
        // call action to call server with given
        if (this.state.selectedOption === "login") {
          const result = await logInUser(encryptedData.encryptedData);
          if (result.error) {
            this.setState({ apiStatus: result.message });
            setTimeout(() => {
              this.setState({ apiStatus: "" });
            }, 1500);
          }
        } else {
          const result = await signUp(encryptedData.encryptedData);
          if (result.error) {
            this.setState({ apiStatus: result.message });
            setTimeout(() => {
              this.setState({ apiStatus: "" });
            }, 1500);
          }
          //
        }
      }
    }
  };

  /**
   *
   * @param {*} selectedOption
   * @description Handles the input field errors
   */
  handleError = (selectedOption) => {
    var inputs;
    let errorFlag = true;
    if (selectedOption === "login") {
      inputs = { ...this.state.loginInputs };
    } else inputs = { ...this.state.signupInputs };
    let keyList = Object.keys(inputs);

    for (const key of keyList) {
      // check if there is a regex
      if (inputs[key].regex) {
        // If user input does not match the regex
        if (!inputs[key].regex.test(inputs[key].value)) {
          // if not matched then append error
          inputs[key].error = inputs[key].errorMessage;
          errorFlag = true;
          break;
        } else {
          // else set error to empty
          inputs[key].error = "";
          errorFlag = false;
        }
      } else {
        // check if fields are empty
        if (!inputs[key].value) {
          inputs[key].error = `${inputs[key].label} cannot be empty`;
          errorFlag = true;
          break;
        } else {
          inputs[key].error = "";
          errorFlag = false;
        }
      }
    }
    // Now set the state
    this.setState(
      // based on selected option conditions
      selectedOption === "login"
        ? { loginInputs: inputs }
        : { signupInputs: inputs }
    );
    return errorFlag;
  };

  render() {
    return (
      <div className="main-container-parent">
        <div className="image-container">
          <img src={homeImage} className="main-image" alt="picture" />
        </div>
        <div className="form-container">
          <h1>Log in</h1>
          <Form
            inputFields={
              this.state.selectedOption === "login"
                ? this.state.loginInputs
                : this.state.signupInputs
            }
            onChange={(text, key) => this.handleChange(text, key)}
          />
          {/* based on selected option show ui element and handle onpress of the same */}
          {this.state.selectedOption === "login" ? (
            <div
              className="user-option"
              onClick={() => this.setState({ selectedOption: "signup" })}
            >
              Sign up instead ?
            </div>
          ) : (
            <div
              className="user-option"
              onClick={() => this.setState({ selectedOption: "login" })}
            >
              Login instead?
            </div>
          )}
          {/* Button to handle submit click of the user */}
          <div
            className="submit-button"
            onClick={() => this.handleSubmitClicked(this.state.selectedOption)}
          >
            Submit
          </div>
          <div className="error-toast">
            {this.state.apiStatus ? (
              <div className="error-message">{this.state.apiStatus}</div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
