import React from "react";

import "./PageHeader.css";

interface PageHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export const PageHeader = ({ className = "", children }: PageHeaderProps) => {
  return (
    <header className={`PageHeader ${className}`}>
      <div className="PageHeader-content">{children}</div>
    </header>
  );
};
