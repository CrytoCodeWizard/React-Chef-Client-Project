import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/users/userActions";
import { selectChef } from "../../store/users/userSelectors";
import "./MyProfile.css";

function MyProfile() {
  const dispatch = useDispatch();
  const chef = useSelector(selectChef);
  const [editMode, setEditMode] = useState(false);
  console.log("CHEF", chef);

  console.log(editMode);

  useEffect(() => {
    dispatch(fetchUser(1));
  }, [dispatch]);

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
          <h4 className="MyProfile-main-heading">Chef {`${chef.firstName} ${chef.lastName}`}</h4>
          <div className="MyProfile-main-detail-wrapper">
            <p className="MyProfile-main-detail">
              {chef.profile?.yearsOfExperience} years of experience
            </p>
            <p className="MyProfile-main-detail">Hourly rate: {chef.profile?.hourlyRate}</p>
            <p className="MyProfile-main-detail">{chef.profile?.position}</p>
            <p className="MyProfile-main-detail">{chef?.city}</p>
          </div>
          <div className="MyProfile-main-tagbox">
            {chef.profile?.specializationTags.map((x) => (
              <div key={x.id} className="ChefCard-tag">
                {x.tagName}
              </div>
            ))}
          </div>
          <p className="MyProfile-main-description">{chef.profile?.description}</p>
          {editMode && (
            <textarea rows="6" cols="30">
              {chef.profile.description}
            </textarea>
          )}
        </div>
        <div className="MyProfile-main-right">
          <h1>right</h1>
        </div>
        <button onClick={() => setEditMode(!editMode)}>Edit Profile</button>
      </div>
    </Container>
  );
}

export default MyProfile;
