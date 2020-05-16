import React from "react";

import "./PageContent.css";

interface ContentProps {
  className?: string;
  children?: React.ReactNode;
}

export const PageContent = ({ className = "", children }: ContentProps) => {
  return <main className={`PageContent ${className}`}>{children}</main>;
};
