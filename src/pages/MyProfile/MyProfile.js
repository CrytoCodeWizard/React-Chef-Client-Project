import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/userLogin/userLoginSelectors";
import { deleteUserTag, fetchUser } from "../../store/users/userActions";
import { selectChef } from "../../store/users/userSelectors";
import "./MyProfile.css";

function MyProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const chef = useSelector(selectChef);
  const userId = parseInt(user.id);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  const deleteTag = (tagId) => () => {
    dispatch(deleteUserTag(tagId, userId));
    console.log(tagId);
  };

  const tagDeleteStyle = {
    cursor: "pointer",
    backgroundColor: "red",
  };

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
            <i className="las la-envelope la-2x"></i>2 new messages
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
            {editMode
              ? chef.profile?.specializationTags.map((x) => (
                  <div
                    style={tagDeleteStyle}
                    onClick={deleteTag(x.id)}
                    key={x.id}
                    className="ChefCard-tag"
                  >
                    {x.tagName}
                  </div>
                ))
              : chef.profile?.specializationTags.map((x) => (
                  <div onClick={deleteTag(x.id)} key={x.id} className="ChefCard-tag">
                    {x.tagName}
                  </div>
                ))}
          </div>
          <p className="MyProfile-main-description">{chef.profile?.description}</p>
          {editMode && (
            <textarea defaultValue={chef.profile.description} rows="6" cols="30"></textarea>
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
