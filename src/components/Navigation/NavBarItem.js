import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function NavBarItem(props) {
  return (
    <Nav.Item>
      <Nav.Link as={NavLink} to={props.path}>
        {props.linkText}
      </Nav.Link>
    </Nav.Item>
  );
}

export default NavBarItem;
