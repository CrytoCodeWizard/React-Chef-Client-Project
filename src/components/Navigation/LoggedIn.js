import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/userLogin/userLoginActions";
import Button from "react-bootstrap/Button";
import { selectUser } from "../../store/userLogin/userLoginSelectors";
import { Nav } from "react-bootstrap";

function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <>
      <Nav.Item style={{ padding: ".5rem 1rem", color: "white" }}>
        {" "}
        <span>
          <i className="las la-user"></i>
        </span>{" "}
        {user.email}
      </Nav.Item>
      <Button onClick={() => dispatch(logOut())}>Logout</Button>
    </>
  );
}

export default LoggedIn;
