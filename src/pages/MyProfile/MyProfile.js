import React, { useEffect, useState } from "react";
import moment from "moment";
import Calendar from "../../components/Calendar/Calendar.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { selectToken, selectUser } from "../../store/userLogin/userLoginSelectors";
import {
  addUserTag,
  deleteUserTag,
  fetchUser,
  updateUserProfile,
} from "../../store/users/userActions";
import { selectChef } from "../../store/users/userSelectors";
import "./MyProfile.css";
import EditMode from "./EditMode.js";
import { newMessageCount } from "../../store/messages/messageSelectors.js";
import { fetchUserMessages } from "../../store/messages/messageActions.js";

function MyProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const chef = useSelector(selectChef);
  const newMessages = useSelector(newMessageCount);

  const userId = parseInt(user.id);
  const profileId = parseInt(chef.profile?.id);
  const [selectedDate, setSelectedDate] = useState(moment());
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

    if (userId) {
      dispatch(fetchUser(userId));
      dispatch(fetchUserMessages(userId));
    }
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
    <div className="MyProfile container">
      <div className="MyProfile-top">
        <div className="MyProfile-img-wrapper">
          <img className="MyProfile-img" src={chef.profile.imgUrl} alt="chef" />
        </div>
        <div className="MyProfile-msg">
          <i className="las la-envelope la-2x"></i>
          {newMessages} new messages
        </div>
        <Link className="MyProfile-booking-link" to="/profile/bookings">
          <button className="MyProfile-booking-btn">My Bookings</button>{" "}
        </Link>
        <Link className="MyProfile-inbox-link" to="/profile/inbox">
          <button className="MyProfile-inbox-btn">Inbox</button>
        </Link>
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
                  <div key={x.id} className="ChefCard-tag">
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
            <EditMode setEditProfile={setEditProfile} chef={chef} editProfile={editProfile} />
          )}
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
        <div className="MyProfile-main-right">
          <h1 className="MyProfile-main-right-header">Availability</h1>

          <Calendar selectedDate={selectedDate} onChange={setSelectedDate} />
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
