import React from "react";
import { Nav } from "react-bootstrap";
import StepLink from "./StepLink";

interface CheckoutStepsProps {
  stepCount: number;
}

const StepsInfos = [
  {
    text: "Sign In",
    link: "/login?redirect=/shipping",
  },
  {
    text: "Shipping",
    link: "/shipping",
  },
  {
    text: "Payment",
    link: "/payment",
  },
  {
    text: "Place Order",
    link: "/order",
  },
];

const CheckoutSteps = ({ stepCount }: CheckoutStepsProps) => {
  return (
    <Nav className="justify-content-center md-4">
      {StepsInfos.map(({ text, link }, ind) => (
        <StepLink key={link} text={text} link={link} clickable={ind < stepCount} />
      ))}
    </Nav>
  );
};

export default CheckoutSteps;
