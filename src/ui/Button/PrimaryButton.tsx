import React from "react";

import { Button } from "./Button";

import "./PrimaryButton.css";

interface PrimaryButtonProps extends React.ComponentProps<typeof Button> {}

export const PrimaryButton = ({
  className = "",
  ...rest
}: PrimaryButtonProps) => {
  return <Button className={`PrimaryButton ${className}`} {...rest} />;
};
