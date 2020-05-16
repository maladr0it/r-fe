import React from "react";

import "./Button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ className = "", ...rest }: ButtonProps) => {
  return <button className={`Button ${className}`} {...rest} />;
};
