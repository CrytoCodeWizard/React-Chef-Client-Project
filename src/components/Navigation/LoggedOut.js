import React from "react";
import NavBarItem from "./NavBarItem";

function LoggedOut() {
  return (
    <>
      <NavBarItem path="/login" linkText="Login" />
    </>
  );
}

export default LoggedOut;
