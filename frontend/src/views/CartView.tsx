import React, { ChangeEvent } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button, Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { RootState } from "../store";
import Message from "../components/Message";
import { addToCart } from "../store/cart/actions";

interface CartViewProps extends RouteComponentProps<{ id: string }> {}

const CartView = ({ history }: CartViewProps) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const handleQtyChange = React.useCallback(
    (item) => (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        addToCart({
          ...item,
          qty: Number(e.target.value),
        }),
      );
    },
    [dispatch],
  );

  const handleRemoveFromCart = React.useCallback((item) => () => {}, []);
  const handleCheckout = React.useCallback(() => {}, []);

  return (
    <Row className="align-items-end">
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={5}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control as="select" value={item.qty} onChange={handleQtyChange(item)}>
                      {Array.from({ length: item.countInStock }).map((_, ind) => (
                        <option key={ind} value={ind + 1}>
                          {ind + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button type="button" variant="light" onClick={handleRemoveFromCart(item)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
              <span>
                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartView;
