import LoginSignUp from "../../components/Login-Signup/index";
import React from "react";
import { shallow } from "enzyme";

const wrapper = shallow(<LoginSignUp />);
describe("Test suite for Main home component", () => {
  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should check for on click events to mutate state", () => {
    expect(wrapper.find("#header").props().children).toBe("Log in");
    wrapper.find("#sign-up-click").simulate("click");
    expect(wrapper.find("#header").props().children).toBe("Sign up");
    wrapper.find("#log-in-click").simulate("click");
    expect(wrapper.find("#header").props().children).toBe("Log in");
    // Click on submit button
    wrapper.find("#submit-click").simulate("click");
  });
});
