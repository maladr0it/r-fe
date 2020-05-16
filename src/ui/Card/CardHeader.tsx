import React from "react";

import "./CardHeader.css";

interface CardHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export const CardHeader = ({ className = "", children }: CardHeaderProps) => {
  return <header className={`CardHeader ${className}`}>{children}</header>;
};
