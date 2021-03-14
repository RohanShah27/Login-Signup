import React from "react";
import TextField from "./TextField";
import "../../assets/styles/main-form.css";
export default function Form({ inputFields, onChange, onBlur }) {
  return (
    <div className="form-parent">
      {Object.keys(inputFields).map((key) => (
        <>
          <TextField
            value={inputFields[key].value}
            error={inputFields[key].error}
            placeholder={inputFields[key].placeholder}
            label={inputFields[key].label}
            handleChange={(event) => {
              onChange(event.target.value, key);
            }}
            type={inputFields[key].type}
          />
        </>
      ))}
    </div>
  );
}
