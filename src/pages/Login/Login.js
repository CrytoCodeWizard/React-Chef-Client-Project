import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

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
            <input
              onchange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              value={loginData.email}
              type="email"
              placeholder="Enter email"
            />
            <input
              onchange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              value={loginData.password}
              type="password"
              placeholder="Enter email"
            />
            <Button variant="primary" type="submit">
              Log in
            </Button>
            <Link to="/signup">Click to sign up</Link>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default Login;
