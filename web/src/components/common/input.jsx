import React from "react";

const Input = ({ type, name, label, value, onChange, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        value={value}
        onChange={onChange}
        id={name}
        type={type}
        className="form-control"
        name={name}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
