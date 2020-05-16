import React from "react";
import { useField } from "formik";

import "./Select.css";

interface TextInputProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  name: string;
  label: React.ReactNode;
  options?: { label: string; value: string }[];
}

export const Select = ({
  name,
  label,
  options,
  className = "",
  ...rest
}: TextInputProps) => {
  const [field] = useField({ name });

  return (
    <label className={`Select-container ${className}`}>
      <span className="Select-label fw-bold">{label}</span>
      <div
        className={`Select-inputContainer ${
          rest.disabled ? "Select-inputContainer--disabled" : ""
        }`}
      >
        <select className="Select-input fs-3 mt-sm" {...field} {...rest}>
          <option label="---" value=""></option>
          {options?.map((option) => (
            <option
              key={option.label}
              label={option.label}
              value={option.value}
            />
          ))}
        </select>
      </div>
    </label>
  );
};
