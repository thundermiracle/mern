import React from "react";
import { LinkContainer } from "react-router-bootstrap";

import { Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../store/user/actions";

const Header = () => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state: RootState) => state.userLogin);

  React.useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

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
              {!loading && user && <div>Sign out</div>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
