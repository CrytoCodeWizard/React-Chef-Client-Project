import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import TagBox from "../TagBox/TagBox";
import "./ChefCard.css";

function ChefCard({ id, name, city, img, tags }) {
  return (
    <Card style={{ width: "18rem" }} className="ml-4 p-3">
      <Link to={`/users/${id}/profile`}>
        <Card.Img className="ChefCard-img" alt="chef" src={img} />
        <Card.Title className="mt-2">{name}</Card.Title>
      </Link>
      <TagBox tags={tags} />
      <div className="ChefCard-rating">
        <i className="ChefCard-icon las la-star"></i>
        <i className="ChefCard-icon las la-star"></i>
        <i className="ChefCard-icon las la-star"></i>
        <i className="ChefCard-icon las la-star"></i>
        <i className="ChefCard-icon las la-star"></i>
        <div>4.8 / 5</div>
      </div>{" "}
      <h4>
        <i className="las la-map-marker"> </i>
        {city}
      </h4>
    </Card>
  );
}

export default ChefCard;
