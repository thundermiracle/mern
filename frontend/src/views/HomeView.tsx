import React from "react";
import { Col, Row } from "react-bootstrap";

import Product from "../components/Product";
import ProductsData from "../data/products";

const HomeView = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {ProductsData.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeView;
