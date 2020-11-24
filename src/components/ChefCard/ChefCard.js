import React from "react";
import { Link } from "react-router-dom";
import "./ChefCard.css";

function ChefCard(props) {
  const { id } = props;

  return (
    <div className="ChefCard">
      <Link to={`/users/${id}/profile`}>
        <img
          className="ChefCard-img"
          alt="chef"
          src="https://img.freepik.com/free-vector/coloured-chefdesign_1152-72.jpg?size=338&ext=jpg"
        />
        <h3 className="ChefCard-header">Roibin O'Toole</h3>
      </Link>
      <div className="ChefCard-tagbox">
        <div className="ChefCard-tag">French</div>
        <div className="ChefCard-tag">Italian</div>
      </div>
      <div className="ChefCard-rating">
        <i class="las la-star"></i>
        <i class="las la-star"></i>
        <i class="las la-star"></i>
        <i class="las la-star"></i>
        <i class="las la-star"></i>
        <div>4.8 / 5</div>
      </div>{" "}
      <h4>
        <i class="las la-map-marker"> </i>Amsterdam
      </h4>
    </div>
  );
}

export default ChefCard;
