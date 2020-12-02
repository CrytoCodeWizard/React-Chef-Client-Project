import React from "react";
import NavBarItem from "./NavBarItem";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/userLogin/userLoginSelectors";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import "./Navigation.css";

function Navigation() {
  const history = useHistory();
  const token = useSelector(selectToken);

  return (
    <Navbar className="Navbar" expand="lg" bg="dark" variant="dark">
      <Navbar.Brand as={NavLink} to="/">
        <div className="Navbar-brand-box">
          <i className="las la-utensils la-2x"></i>
          <span>Chef</span>_Available()
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%" }} fill>
          <NavBarItem align path="/" linkText="Home" />
          {!token || history.location.pathname === "/profile" ? null : (
            <NavBarItem align path="/profile" linkText="My Profile" />
          )}
          {token ? <LoggedIn /> : <LoggedOut />}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
