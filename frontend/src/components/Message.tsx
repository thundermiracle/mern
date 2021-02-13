import React from "react";
import { Alert } from "react-bootstrap";

interface MessageProps {
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark" | "light";
  children: any;
}

const Message = ({ variant = "info", children }: MessageProps) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
