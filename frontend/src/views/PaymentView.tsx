import React, { ChangeEvent, FormEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";

import FormContainer from "../components/FormContainer";
import { RootState } from "../store";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../store/payment/actions";

const AvailablePaymentMethods = [
  {
    text: "PayPal or Credit Card",
    value: "PayPal",
  },
  {
    text: "Stripe",
    value: "Stripe",
  },
  {
    text: "Cash",
    value: "Cash",
  },
];

const PaymentView = ({ history }: RouteComponentProps) => {
  const { shippingAddress } = useSelector((state: RootState) => state.shipping);
  const { paymentMethod: savedPaymentMethod } = useSelector((state: RootState) => state.payment);

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = React.useState(savedPaymentMethod || "PayPal");
  const dispatch = useDispatch();

  const handleFormChange = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  }, []);

  const handleSubmit = React.useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      dispatch(savePaymentMethod(paymentMethod));

      history.push("/placeorder");
    },
    [paymentMethod, dispatch, history],
  );

  return (
    <FormContainer>
      <CheckoutSteps stepCount={3} />
      <h1>Payment</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            {AvailablePaymentMethods.map(({ text, value }) => (
              <Form.Check
                key={value}
                type="radio"
                label={text}
                id={value}
                name="paymentMethod"
                value={value}
                checked={paymentMethod === value}
                onChange={handleFormChange}
              ></Form.Check>
            ))}
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentView;
