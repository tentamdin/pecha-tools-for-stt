import React from "react";

const DateInput = ({ label }) => {
  return (
    <div className="form-control max-w-xs">
      <label className="label" htmlFor={label}>
        <span className="label-text">{label}:</span>
      </label>
      <input
        name={label}
        type="date"
        className="input input-bordered max-w-xs"
      />
    </div>
  );
};

export default DateInput;
