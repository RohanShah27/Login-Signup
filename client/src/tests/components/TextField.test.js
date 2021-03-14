import React from "react";
import { shallow } from "enzyme";
import TextField from "../../components/common/TextField";

const id = "test";
const value = "value";
const label = "test label";
const type = "password";
const handleChange = jest.fn();
const onBlur = jest.fn();
const onFocus = jest.fn();
const minChar = 5;
const maxChar = 10;
const error = "";
const placeholder = "password";
const wrapper = shallow(
  <TextField
    id={id}
    value={value}
    label={label}
    type={type}
    handleChange={handleChange}
    onBlur={onBlur}
    onFocus={onFocus}
    minChar={minChar}
    maxChar={maxChar}
    error={error}
    placeholder={placeholder}
  />
);

describe("Test suite for text field fnc", () => {
  it("should render the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("simulate on change and on blur", () => {
    let event = {
      target: { value: "abc" },
    };
    wrapper.find("#testinput").simulate("change", event);
    expect(handleChange).toBeCalled();
    wrapper.find("#testinput").simulate("blur");
    expect(onBlur).toBeCalled();
  });
  it("should check for props", () => {
    expect(wrapper.find("#testinput").props().maxLength).toBe(maxChar);
    expect(wrapper.find("#testinput").props().minLength).toBe(minChar);
    expect(wrapper.find("#testinput").props().placeholder).toBe(placeholder);
    expect(wrapper.find("#testinput").props().type).toBe(type);
    expect(wrapper.find("#testinput").props().value).toBe(value);
  });
});
