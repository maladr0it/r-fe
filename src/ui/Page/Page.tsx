import React from "react";

import "./Page.css";

interface PageProps {
  className?: string;
  children?: React.ReactNode;
}

export const Page = ({ className = "", children }: PageProps) => {
  return <div className={`Page ${className}`}>{children}</div>;
};
