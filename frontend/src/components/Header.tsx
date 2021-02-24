import React from "react";
import { LinkContainer } from "react-router-bootstrap";

import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, userLogout } from "../store/user/actions";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { loading, user } = useSelector((state: RootState) => state.userLogin);

  React.useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const handleLogout = React.useCallback(() => {
    dispatch(userLogout());
    history.push("/");
  }, [dispatch, history]);

  return (
    <header>
      <Container>
        <Navbar bg="light" expand="lg" collapseOnSelect>
          <LinkContainer to="/">
            <Navbar.Brand href="/">ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FontAwesomeIcon icon={faShoppingCart} />
                  Cart
                </Nav.Link>
              </LinkContainer>
              {!loading && !user && (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FontAwesomeIcon icon={faUser} />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {!loading && user && (
                <NavDropdown title={user.name} id="userName">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
