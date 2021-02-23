import React, { ChangeEvent, FormEvent } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";

import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { userRegister } from "../store/user/actions";
import { RootState } from "../store";
import Loader from "../components/Loader";

interface RegisterViewProps extends RouteComponentProps<{ redirect?: string }> {}

const RegisterView = ({ match, history }: RegisterViewProps) => {
  const { params } = match;
  const [registerInfo, setRegisterInfo] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = React.useState("");

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state: RootState) => state.userLogin);
  const handleFormChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newRegisterInfo = {
        ...registerInfo,
        [e.target.name]: e.target.value,
      };
      setRegisterInfo(newRegisterInfo);

      setErrorMessage("");
      if (newRegisterInfo.password !== newRegisterInfo.confirmPassword) {
        setErrorMessage("Password did not match");
      }
    },
    [registerInfo],
  );

  React.useEffect(() => {
    if (user) {
      history.push(params.redirect || "/");
    }
  }, [history, user, params.redirect]);

  const handleRegister = React.useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (errorMessage) {
        return;
      }

      dispatch(userRegister(registerInfo.name, registerInfo.email, registerInfo.password));
    },
    [dispatch, errorMessage, registerInfo.name, registerInfo.email, registerInfo.password],
  );

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {loading && <Loader />}
      {errorMessage && <Message variant="danger">{errorMessage}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {!user && (
        <Form onSubmit={handleRegister}>
          <Form.Group controlId="name">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={registerInfo.name}
              onChange={handleFormChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={registerInfo.email}
              onChange={handleFormChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              value={registerInfo.password}
              onChange={handleFormChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={registerInfo.confirmPassword}
              onChange={handleFormChange}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" disabled={loading || !!errorMessage}>
            Register
          </Button>

          <Row className="py-3">
            <Col>
              Have an Account?{" "}
              <Link to={params.redirect ? `/login?redirect=${params.redirect}` : "/login"}>
                Login
              </Link>
            </Col>
          </Row>
        </Form>
      )}
    </FormContainer>
  );
};

export default RegisterView;
