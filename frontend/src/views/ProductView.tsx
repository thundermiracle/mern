import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Col, Row, Image, ListGroup, Card, Button } from "react-bootstrap";
import productService from "../services/productService";
import Rating from "../components/Rating";
import { ProductData } from "../types";

interface ProductViewProps extends RouteComponentProps<{ id: string }> {}

const ProductView = ({ match }: ProductViewProps) => {
  const [product, setProduct] = React.useState<ProductData>();

  React.useEffect(() => {
    productService.get(match.params.id).then(setProduct);
  }, [match.params.id]);

  if (product == null) {
    return null;
  }

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
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
    </>
  );
};

export default ProductView;
