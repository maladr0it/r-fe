import React from "react";

import { PrimaryButton } from "./PrimaryButton";
import "./LoadingButton.css";

interface LoadingButtonProps
  extends React.ComponentProps<typeof PrimaryButton> {
  loading: boolean;
}

export const LoadingButton = ({
  className = "",
  loading,
  children,
  disabled,
  ...rest
}: LoadingButtonProps) => {
  return (
    <PrimaryButton
      className={`LoadingButton ${className}`}
      disabled={loading ? true : disabled}
      {...rest}
    >
      <div className="LoadingButton-content">
        <span
          className={`LoadingButton-label ${
            loading ? "LoadingButton-label--loading" : ""
          }`}
        >
          {children}
        </span>
        <span
          className={`LoadingButton-spinner ${
            loading ? "LoadingButton-spinner--loading" : ""
          }`}
        >
          ...
        </span>
      </div>
    </PrimaryButton>
  );
};
