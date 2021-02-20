import React, { ChangeEvent, FormEvent } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";

import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { userLogin } from "../store/user/actions";
import { RootState } from "../store";
import Loader from "../components/Loader";

interface LoginViewProps extends RouteComponentProps<{ redirect?: string }> {}

const LoginView = ({ history, match }: LoginViewProps) => {
  const { params } = match;
  const [loginInfo, setLoginInfo] = React.useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state: RootState) => state.userLogin);

  const handleFormChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setLoginInfo({
        ...loginInfo,
        [e.target.name]: e.target.value,
      });
    },
    [loginInfo],
  );

  const handleLogin = React.useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      dispatch(userLogin(loginInfo.email, loginInfo.password));
    },
    [dispatch, loginInfo.email, loginInfo.password],
  );

  React.useEffect(() => {
    if (user) {
      history.push(params.redirect || "/");
    }
  }, [history, user, params.redirect]);

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {!user && (
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginInfo.email}
              onChange={handleFormChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginInfo.password}
              onChange={handleFormChange}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" disabled={loading}>
            Sign In
          </Button>

          <Row className="py-3">
            <Col>
              New Customer?{" "}
              <Link to={params.redirect ? `/register?redirect=${params.redirect}` : "/register"}>
                Register
              </Link>
            </Col>
          </Row>
        </Form>
      )}
    </FormContainer>
  );
};

export default LoginView;
