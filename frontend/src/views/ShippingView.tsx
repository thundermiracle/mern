import React, { ChangeEvent, FormEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";

import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { RootState } from "../store";
import Loader from "../components/Loader";
import { addShippingAddress } from "../store/shipping/actions";

const ShippingView = ({ history }: RouteComponentProps) => {
  const { shippingAddress } = useSelector((state: RootState) => state.shipping);
  const [shippingInfo, setShippingInfo] = React.useState(
    shippingAddress || {
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
  );
  const [errorMessage, setErrorMessage] = React.useState("");
  const dispatch = useDispatch();

  const handleFormChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newShippingInfo = {
        ...shippingInfo,
        [e.target.name]: e.target.value,
      };
      setShippingInfo(newShippingInfo);

      setErrorMessage("");
      if (!e.target.value) {
        setErrorMessage(`${e.target.name} is required.`);
      }
    },
    [shippingInfo],
  );

  const handleSubmit = React.useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (
        !shippingInfo.address ||
        !shippingInfo.city ||
        !shippingInfo.postalCode ||
        !shippingInfo.country
      ) {
        setErrorMessage("All fields are required");
        return;
      }

      dispatch(addShippingAddress(shippingInfo));

      history.push("/payment");
    },
    [shippingInfo, dispatch, history],
  );

  return (
    <FormContainer>
      <h1>Shipping</h1>
      {errorMessage && <Message variant="danger">{errorMessage}</Message>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            placeholder="Enter your address"
            value={shippingInfo.address}
            onChange={handleFormChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            placeholder="Enter your city"
            value={shippingInfo.city}
            onChange={handleFormChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>PostalCode</Form.Label>
          <Form.Control
            type="text"
            name="postalCode"
            placeholder="Enter your postalCode"
            value={shippingInfo.postalCode}
            onChange={handleFormChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            name="country"
            placeholder="Enter your country"
            value={shippingInfo.country}
            onChange={handleFormChange}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingView;
