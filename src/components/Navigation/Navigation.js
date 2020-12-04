import React, { useState } from "react";
import NavBarItem from "./NavBarItem";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../../store/userLogin/userLoginSelectors";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import "./Navigation.css";
import SearchBar from "../SearchBar/SearchBar";
import { selectAllChefs } from "../../store/users/userSelectors";

function Navigation() {
  const [value, setValue] = useState(null);
  const history = useHistory();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const chefs = useSelector(selectAllChefs);

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
          {!token || history.location.pathname === "/profile" ? null : user.userType === "Chef" ? (
            <NavBarItem align path="/profile" linkText="My Profile" />
          ) : (
            <NavBarItem align path="/profile/employer" linkText="Employer Profile" />
          )}
          {token && history.location.pathname === "/" ? (
            <div style={{ width: "200px" }}>
              <SearchBar
                options={chefs}
                id="id"
                label="firstName"
                label2="lastName"
                prompt="Search chef..."
                value={value}
                onChange={(val) => setValue(val)}
              />
            </div>
          ) : null}

          {token ? <LoggedIn /> : <LoggedOut />}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
