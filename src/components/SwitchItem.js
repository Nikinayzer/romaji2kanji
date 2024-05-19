import React from "react";

const SwitchItem = ({ label, checked, disabled, onChange }) => {
  return (
    <div className="dropdown-item">
      <label className="switch">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
        <span className="slider round"></span>
      </label>
      {label}
    </div>
  );
};

export default SwitchItem;