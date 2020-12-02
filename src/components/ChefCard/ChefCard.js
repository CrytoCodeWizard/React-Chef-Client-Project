import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import SimpleRating from "../SimpleRating/SimpleRating";
import TagBox from "../TagBox/TagBox";
import "./ChefCard.css";

function ChefCard({ id, name, city, img, tags, reviews }) {
  const reviewSum = reviews.reduce((a, b) => a + b.reviewScore, 0);
  const reviewAverage = reviewSum / reviews.length;

  return (
    <Card style={{ width: "18rem" }} className="flex-column justify-content-between ml-4 mb-4 p-3">
      <Link to={`/users/${id}/profile`}>
        <Card.Img className="ChefCard-img" alt="chef" src={img} />
        <Card.Title className="mt-2">{name}</Card.Title>
      </Link>
      <TagBox tags={tags} />
      <SimpleRating reviewScore={parseFloat(reviewAverage.toFixed(1))} />
      {!reviewAverage ? <div>No rating yet</div> : <div>{reviewAverage.toFixed(1)} / 5</div>}

      <h4>
        <i className="las la-map-marker"> </i>
        {city}
      </h4>
    </Card>
  );
}

export default ChefCard;
