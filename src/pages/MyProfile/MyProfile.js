import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "./MyProfile.css";

function MyProfile() {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <Container>
      <div className="MyProfile">
        <div className="MyProfile-top">
          <div className="MyProfile-img-wrapper">
            <img
              className="MyProfile-img"
              src="https://artzycafe.com/wp-content/uploads/2020/05/Vocations-in-Cooking.jpg"
              alt="chef"
            />
          </div>
          <div className="MyProfile-msg">
            <i class="las la-envelope la-2x"></i>2 new messages
          </div>
          <button className="MyProfile-booking-btn">My Bookings</button>
          <button className="MyProfile-inbox-btn">Inbox</button>
        </div>
      </div>
      <div className="MyProfile-main">
        <div className="MyProfile-main-left">
          <h4 className="MyProfile-main-heading">Chef Roibin O'Toole</h4>
          <div className="MyProfile-main-detail-wrapper">
            <p className="MyProfile-main-detail">14 years of experience</p>
            <p className="MyProfile-main-detail">Hourly rate: 34,50</p>
            <p className="MyProfile-main-detail">Head Chef</p>
            <p className="MyProfile-main-detail">Amsterdam</p>
          </div>
          <div className="MyProfile-main-tagbox">
            <div className="ChefCard-tag">tosser</div>
            <div className="ChefCard-tag">french</div>
            <div className="ChefCard-tag">crap chef</div>
            <div className="ChefCard-tag">burned food</div>
          </div>
          <p className="MyProfile-main-description">
            Chef Roibin O'Toole is a passionate chef with over 14 years of experience cooking in
            various restaurants in Amsterdam. He specializes in French / Mediterranean cuisine and
            is available for work in a 20km radius around Amsterdam.
          </p>
        </div>
        <div className="MyProfile-main-right">
          <h1>right</h1>
        </div>
        <button>Edit Profile</button>
      </div>
    </Container>
  );
}

export default MyProfile;
