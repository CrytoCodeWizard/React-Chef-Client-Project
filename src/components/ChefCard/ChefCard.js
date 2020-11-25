import React from "react";
import { Link } from "react-router-dom";
import "./ChefCard.css";

function ChefCard(props) {
  const { id, name, city, img, tags } = props;

  return (
    <div className="ChefCard">
      <Link to={`/users/${id}/profile`}>
        <div className="ChefCard-img-wrapper">
          <img className="ChefCard-img" alt="chef" src={img} />
        </div>
        <h3 className="ChefCard-header">{name}</h3>
      </Link>
      <div className="ChefCard-tagbox">
        {tags.map((x) => (
          <div key={x.id} className="ChefCard-tag">
            {x.tagName}
          </div>
        ))}
      </div>
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
    </div>
  );
}

export default ChefCard;
