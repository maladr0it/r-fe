import React from "react";
import { useField } from "formik";

import "./TextInput.css";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: React.ReactNode;
}

export const TextInput = ({ name, label, ...rest }: TextInputProps) => {
  const [field] = useField({ name });

  return (
    <label className="TextInput-container">
      <span className="TextInput-label fw-bold">{label}</span>
      <input
        className="TextInput fs-3 mt-sm"
        type="text"
        {...field}
        {...rest}
      />
    </label>
  );
};
