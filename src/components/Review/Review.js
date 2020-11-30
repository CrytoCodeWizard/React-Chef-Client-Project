import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import HoverRating from "../HoverRating/HoverRating";
import "./Review.css";

function Review({ userId }) {
  return (
    <Form className="CreateReview">
      <Form.Row>
        <Col>
          <Form.Control className="mb-2" placeholder="Title" />
        </Col>
        <Col>
          <HoverRating />
        </Col>
      </Form.Row>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>How was your experience?</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Button>Submit</Button>
    </Form>
  );
}

export default Review;
