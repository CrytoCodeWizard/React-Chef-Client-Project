import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectToken, selectUser } from "../../store/userLogin/userLoginSelectors";
import {
  addUserTag,
  deleteUserTag,
  fetchUser,
  updateUserProfile,
} from "../../store/users/userActions";
import { selectChef } from "../../store/users/userSelectors";
import "./MyProfile.css";

function MyProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const chef = useSelector(selectChef);

  const userId = parseInt(user.id);
  const profileId = parseInt(chef.profile?.id);
  const [editMode, setEditMode] = useState(false);
  const [newTag, setNewTag] = useState("");

  const [editProfile, setEditProfile] = useState({
    yearsOfExperience: chef.profile?.yearsOfExperience,
    hourlyRate: chef.profile?.hourlyRate,
    position: chef.profile?.position,
    city: chef.city,
    description: chef.profile?.description,
  });

  useEffect(() => {
    if (!token || token === null) {
      history.push("/");
    }
    dispatch(fetchUser(userId));
  }, [dispatch, userId, history, token]);

  const deleteTag = (tagId) => () => {
    dispatch(deleteUserTag(tagId, userId));
  };

  const addTag = () => (e) => {
    if (e.key === "Enter") {
      dispatch(addUserTag(newTag, profileId));
    }
  };

  const handleSaveProfile = () => {
    setEditMode(!editMode);

    dispatch(updateUserProfile(editProfile, userId, profileId));
  };

  const tagDeleteStyle = {
    cursor: "pointer",
    backgroundColor: "red",
  };

  return (
    <Container className="height">
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
              Years of experience: {chef.profile?.yearsOfExperience}
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
            {editMode && (
              <input
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={addTag()}
                className="MyProfile-main-tagInput"
                placeholder="Add a tag"
                type="text"
              />
            )}
          </div>
          <p className="MyProfile-main-description">{chef.profile?.description}</p>
          {editMode && (
            <div className="MyProfile-editMode-wrapper">
              <h5>Edit profile details...</h5>
              <input
                onChange={(e) =>
                  setEditProfile({ ...editProfile, yearsOfExperience: e.target.value })
                }
                className="MyProfile-editMode-input"
                placeholder={editProfile.yearsOfExperience}
                type="text"
              />
              <input
                onChange={(e) => setEditProfile({ ...editProfile, hourlyRate: e.target.value })}
                placeholder={editProfile.hourlyRate}
                className="MyProfile-editMode-input"
                type="text"
              />
              <input
                onChange={(e) => setEditProfile({ ...editProfile, position: e.target.value })}
                className="MyProfile-editMode-input"
                placeholder={editProfile.position}
                type="text"
              />
              <input
                onChange={(e) => setEditProfile({ ...editProfile, city: e.target.value })}
                className="MyProfile-editMode-input"
                placeholder={editProfile.city}
                type="text"
              />
              <textarea
                className="MyProfile-editMode-textarea"
                onChange={(e) => setEditProfile({ ...editProfile, description: e.target.value })}
                rows="6"
                cols="30"
                defaultValue={chef && chef.profile.description}
              ></textarea>
            </div>
          )}
        </div>
        <div className="MyProfile-main-right">
          <h1>right</h1>
        </div>
        {editMode ? (
          <div>
            <button className="MyProfile-editMode-btn" onClick={() => handleSaveProfile()}>
              Save
            </button>
            <button className="MyProfile-editMode-btn" onClick={() => setEditMode(!editMode)}>
              Cancel
            </button>
          </div>
        ) : (
          <button className="MyProfile-editMode-btn" onClick={() => setEditMode(!editMode)}>
            Edit Profile
          </button>
        )}
      </div>
    </Container>
  );
}

export default MyProfile;
