import React from "react";
interface SwitchItemProps {
  id: string;
  label: string;
  checked: boolean;
  disabled: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SwitchItem: React.FC<SwitchItemProps> = ({
  id,
  label,
  checked,
  disabled,
  onChange,
}) => {
  return (
    <div className="dropdown-item">
      <label className="switch" htmlFor={id}>
        <input
          id={id}
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
