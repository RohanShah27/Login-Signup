// Functional text field component
import React, { useState } from "react";
import "../../assets/styles/text-field.css";
export default function TextField({
  id,
  value,
  label,
  type,
  handleChange,
  onBlur,
  onFocus,
  minChar,
  maxChar,
  error,
  placeholder,
}) {
  // Hook to declare the focus state of the field and the setter function
  const [focus, setFocus] = useState(false);
  return (
    <div className="main-container">
      <label className="label" htmlFor={id + "_element"}>
        {label}
      </label>
      <div
        // based on fields like disabled error and warning change the class names to present different
        //  styles to the user
        className={`text-field-container ${
          error ? " error-input" : focus ? "text-field-container-focus" : ""
        }`}
      >
        <input
          value={value}
          id={id + "input"}
          placeholder={placeholder}
          type={type ? type : "text"}
          className="input-text-field"
          onChange={handleChange}
          // Event to change border color when user has clicked on the field
          onFocus={onFocus ? onFocus : () => setFocus(true)}
          // Event to change border color when user has clicked outside the field field
          onBlur={onBlur ? onBlur : () => setFocus(false)}
          minLength={minChar} //minimum number of inputs
          maxLength={maxChar} //maximum number of inputs
        />
      </div>
      {/* Display the error message if any */}
      {error ? (
        <span
          className="input-error-message"
          id={"error-message" + id}
          key={error}
        >
          {error}
        </span>
      ) : null}
    </div>
  );
}
