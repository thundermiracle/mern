import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";

import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../store/product/actions";
import { RootState } from "../store";

const HomeView = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state: RootState) => state.productList);

  React.useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {!loading && products && (
        <Row>
          {products.map((product: any) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeView;
