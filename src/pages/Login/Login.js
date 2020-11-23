import React from "react";
import { Container } from "react-bootstrap";

function Login() {
  const [loginData, setLoginData] = {
    email: "",
    password: "",
  };

  const handleSubmit = (e) => {
    console.log("Submit");
    e.PreventDefault();
  };

  return (
    <Container>
      <div className="Login">
        <h1>Login</h1>
        <div className="Login-form">
          <form onSubmit={handleSubmit}>
            <input type="email"></input>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default Login;
