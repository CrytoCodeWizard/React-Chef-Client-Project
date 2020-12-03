import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../../store/reviews/reviewActions";
import { selectUser } from "../../store/userLogin/userLoginSelectors";
import HoverRating from "../HoverRating/HoverRating";
import "./Review.css";

function Review({ profileId }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [review, setReview] = useState({
    title: "",
    content: "",
    profileId: profileId,
    userId: user.id,
    reviewScore: 2,
  });

  const handleReviewSubmit = (review) => (e) => {
    e.preventDefault();
    dispatch(postReview(review, profileId));

    setReview({
      title: "",
      content: "",
    });
  };
  return (
    <Form onSubmit={handleReviewSubmit()} className="CreateReview">
      <Form.Row>
        <Col>
          <Form.Control
            onChange={(e) => setReview({ ...review, title: e.target.value })}
            className="mb-2"
            value={review.title}
            placeholder="Title"
          />
        </Col>
        <Col>
          <HoverRating setReview={setReview} review={review} />
        </Col>
      </Form.Row>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>How was your experience?</Form.Label>
        <Form.Control
          onChange={(e) => setReview({ ...review, content: e.target.value })}
          as="textarea"
          rows={3}
          value={review.content}
        />
      </Form.Group>
      <Button onClick={handleReviewSubmit(review)}>Submit</Button>
    </Form>
  );
}

export default Review;
