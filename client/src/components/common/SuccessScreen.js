import React from "react";
import success from "../../assets/images/success.svg";
import "../../assets/styles/main-form.css";

export default function SuccessScreen() {
  return (
    <div className="success-parent">
      <h1>Success</h1>
      <div className="success-image-parent">
        <img src={success} className="success-image" />
      </div>
      ;
    </div>
  );
}
