import React, { ChangeEvent, FormEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";

import Message from "../components/Message";
import { updUserProfile } from "../store/user/actions";
import { RootState } from "../store";
import Loader from "../components/Loader";

const ProfileView = ({ history }: RouteComponentProps) => {
  const [profileInfo, setProfileInfo] = React.useState({
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
      const newProfileInfo = {
        ...profileInfo,
        [e.target.name]: e.target.value,
      };
      setProfileInfo(newProfileInfo);

      setErrorMessage("");
      if (newProfileInfo.password !== newProfileInfo.confirmPassword) {
        setErrorMessage("Password did not match");
      }
    },
    [profileInfo],
  );

  React.useEffect(() => {
    if (!user) {
      history.push("/login?redirect=/profile");
    } else {
      setProfileInfo({
        ...profileInfo,
        name: user.name,
        email: user.email,
      });
    }
  }, []);

  const handleSaveProfile = React.useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (errorMessage) {
        return;
      }

      dispatch(updUserProfile(profileInfo.name, profileInfo.email, profileInfo.password));
    },
    [dispatch, errorMessage, profileInfo.name, profileInfo.email, profileInfo.password],
  );

  return (
    <Row>
      <Col md={3}>
        <h2>Profile</h2>
        {loading && <Loader />}
        {errorMessage && <Message variant="danger">{errorMessage}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {user && (
          <Form onSubmit={handleSaveProfile}>
            <Form.Group controlId="name">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={profileInfo.name}
                onChange={handleFormChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={profileInfo.email}
                onChange={handleFormChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={profileInfo.password}
                onChange={handleFormChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={profileInfo.confirmPassword}
                onChange={handleFormChange}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" disabled={loading || !!errorMessage}>
              Update
            </Button>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileView;
