import React from "react";

import "./Card.css";

interface CardProps {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
}

export const Card = ({ as = "div", className = "", children }: CardProps) => {
  const El = as;

  return <El className={`Card ${className}`}>{children}</El>;
};
