import React from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { RootState } from "../store";
import { CartItem } from "../store/cart/types";
import { createOrder } from "../store/order/actions";

const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const calculatePrices = (cartItems: CartItem[]) => {
  const itemsPrice = cartItems.reduce(
    (acc, currentItem) => acc + currentItem.price * currentItem.qty,
    0,
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.1 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return {
    itemsPrice: addDecimals(itemsPrice),
    shippingPrice: addDecimals(shippingPrice),
    taxPrice: addDecimals(taxPrice),
    totalPrice: addDecimals(totalPrice),
  };
};

const PlaceOrderView = ({ history }: RouteComponentProps) => {
  const {
    cart: { cartItems },
    shipping: { shippingAddress },
    payment: { paymentMethod },
    orderCreate: { order, error, success },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (success) {
      history.push(`/order/${order?._id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, history]);

  if (!cartItems) {
    history.push("/");
    return null;
  } else if (!shippingAddress) {
    history.push("/shipping");
    return null;
  } else if (!paymentMethod) {
    history.push("/payment");
    return null;
  }

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculatePrices(cartItems);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handlePlaceOrder = React.useCallback(() => {
    const orderItems = cartItems.map((item) => ({
      ...item,
      productId: item._id,
    }));

    dispatch(
      createOrder({
        orderItems,
        paymentMethod,
        shippingAddress,
        shippingPrice: Number(shippingPrice),
        taxPrice: Number(taxPrice),
        totalPrice: Number(totalPrice),
      }),
    );
  }, [cartItems, dispatch, paymentMethod, shippingAddress, shippingPrice, taxPrice, totalPrice]);

  return (
    <>
      <CheckoutSteps stepCount={4} />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map(({ _id, name, image, qty, price }) => (
                    <ListGroup.Item key={_id}>
                      <Row>
                        <Col md={1}>
                          <Image src={image} alt={name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${_id}`}>{name}</Link>
                        </Col>
                        <Col md={4}>{`${qty} x $${price} = $${qty * price}`}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderView;
