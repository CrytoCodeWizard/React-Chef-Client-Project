import React from "react";
import NavBarItem from "./NavBarItem";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
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
          <NavBarItem align path="/login" linkText="Login" />

          {/* {loginLogoutControls} */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
