import React, { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import "./Signup.css";

function Signup() {
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    userType: "",
    password: "",
    email: "",
    businessName: "",
    dateOfBirth: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setSignupData({
      firstName: "",
      lastName: "",
      userType: "",
      password: "",
      email: "",
      businessName: "",
      dateOfBirth: "",
      address: "",
      city: "",
      postalCode: "",
    });
  };

  console.log(signupData);

  return (
    <Container>
      <div className="Signup">
        <Form as={Col} md={{ span: 4, offset: 2 }} className="Signup-form" onSubmit={handleSubmit}>
          <h1 className="Signup-form mt-5 mb-5">Signup</h1>
          <Form.Group controlId="formBasicFirstname">
            <Form.Control
              onChange={(e) => {
                setSignupData({ ...signupData, firstName: e.target.value });
              }}
              value={signupData.firstName}
              type="text"
              placeholder="Firstname"
            />
          </Form.Group>
          <Form.Group controlId="formBasicLastname">
            <Form.Control
              onChange={(e) => {
                setSignupData({ ...signupData, lastName: e.target.value });
              }}
              value={signupData.lastName}
              type="text"
              placeholder="Lastname"
            />
          </Form.Group>
          <Form.Group controlId="formBasicSelect">
            <Form.Control
              as="select"
              onChange={(e) => {
                setSignupData({ ...signupData, userType: e.target.value });
              }}
            >
              <option value="">User type</option>
              <option value="Chef">Chef</option>
              <option value="Employer">Employer</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              onChange={(e) => {
                setSignupData({ ...signupData, password: e.target.value });
              }}
              value={signupData.password}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group controlId="formBasicBusiness">
            <Form.Control
              onChange={(e) => {
                setSignupData({ ...signupData, businessName: e.target.value });
              }}
              value={signupData.businessName}
              type="text"
              placeholder="Business name"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              onChange={(e) => {
                setSignupData({ ...signupData, email: e.target.value });
              }}
              value={signupData.email}
              type="text"
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group controlId="formBasicDate">
            <Form.Control
              onChange={(e) => {
                setSignupData({ ...signupData, date: e.target.value });
              }}
              value={signupData.date}
              type="date"
            />
          </Form.Group>
          <Form.Group controlId="formBasicAddress">
            <Form.Control
              onChange={(e) => {
                setSignupData({ ...signupData, address: e.target.value });
              }}
              value={signupData.address}
              type="text"
              placeholder="address"
            />
          </Form.Group>
          <Form.Group controlId="formBasicCity">
            <Form.Control
              onChange={(e) => {
                setSignupData({ ...signupData, city: e.target.value });
              }}
              value={signupData.city}
              type="text"
              placeholder="City"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPostalCode">
            <Form.Control
              onChange={(e) => {
                setSignupData({ ...signupData, postalCode: e.target.value });
              }}
              value={signupData.postalCode}
              type="text"
              placeholder="Postal Code"
            />
          </Form.Group>
          <Form.Group className="mt-4">
            <Button onClick={handleSubmit} variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
}

export default Signup;
