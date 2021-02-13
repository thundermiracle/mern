import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { Col, Row, Image, ListGroup, Card, Button } from "react-bootstrap";

import Rating from "../components/Rating";
import Loader from "../components/Loader";
import { singleProduct } from "../store/product/actions";
import { RootState } from "../store";
import Message from "../components/Message";

interface ProductViewProps extends RouteComponentProps<{ id: string }> {}

const ProductView = ({ match }: ProductViewProps) => {
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector((state: RootState) => state.singleProduct);

  React.useEffect(() => {
    dispatch(singleProduct(match.params.id));
  }, [match.params.id, dispatch]);

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {!loading && product && (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>Description: ${product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                  <Row>
                    <Col>Quantity:</Col>
                    <Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button className="btn-block" type="button" disabled={product.countInStock < 1}>
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductView;
