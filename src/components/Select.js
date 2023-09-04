import React from "react";

const Select = ({ title, label, options }) => {
  return (
    <div className="form-control">
      <label className="label" htmlFor={title}>
        <span className="label-text text-base font-semibold">{label}</span>
      </label>
      <select
        id={title}
        name={title}
        className="select select-bordered overflow-y-scroll"
        required
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
