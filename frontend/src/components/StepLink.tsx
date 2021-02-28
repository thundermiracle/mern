import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

interface StepLinkProps {
  link: string;
  text: string;
  clickable?: boolean;
}

const StepLink = ({ link, text, clickable = true }: StepLinkProps) => {
  if (clickable) {
    return (
      <LinkContainer to={link}>
        <Nav.Link>{text}</Nav.Link>
      </LinkContainer>
    );
  }

  return <Nav.Link disabled>{text}</Nav.Link>;
};

export default StepLink;
