import React, { useEffect, useState } from "react";
import moment from "moment";
import Calendar from "../../components/Calendar/Calendar.js";
import ImageUpload from "../../components/ImageUpload/imageUpload.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { selectToken, selectUser } from "../../store/userLogin/userLoginSelectors";
import { addUserTag, fetchUser, updateUserProfile } from "../../store/users/userActions";
import {
  selectChef,
  selectChefImage,
  selectChefProfile,
  selectChefTags,
} from "../../store/users/userSelectors";
import "./MyProfile.css";
import EditMode from "./EditMode.js";
import { newMessageCount } from "../../store/messages/messageSelectors.js";
import TagBox from "../../components/TagBox/TagBox.js";
import { Button } from "react-bootstrap";

function MyProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectToken);
  const userId = useSelector(selectUser).id;
  const chef = useSelector(selectChef);
  const tags = useSelector(selectChefTags);
  const profile = useSelector(selectChefProfile);
  const chefProfileImg = useSelector(selectChefImage);
  const newMessages = useSelector(newMessageCount);

  const profileId = parseInt(chef.profile?.id);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [editMode, setEditMode] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [imageModal, setImageModal] = useState(false);

  const [editProfile, setEditProfile] = useState({
    yearsOfExperience: profile.yearsOfExperience,
    hourlyRate: profile.hourlyRate,
    position: profile.position,
    city: chef.city,
    description: profile.description,
  });

  useEffect(() => {
    if (!token || token === null) {
      history.push("/");
    }
    if (userId) {
      dispatch(fetchUser(userId));
    }
  }, [dispatch, userId, history, token, chefProfileImg]);

  const addTag = () => (e) => {
    if (e.key === "Enter") {
      dispatch(addUserTag(newTag, profileId));
    }
  };

  const handleSaveProfile = () => {
    setEditMode(!editMode);
    dispatch(updateUserProfile(editProfile, userId, profileId));
  };

  return (
    <div className="MyProfile container">
      <div className="MyProfile-top">
        <div className="MyProfile-img-wrapper">
          <img
            onClick={() => setImageModal(!imageModal)}
            className="MyProfile-img"
            src={chefProfileImg}
            alt="chef"
          />
          {imageModal && <ImageUpload setImageModal={setImageModal} imageModal={imageModal} />}
        </div>
        <div className="MyProfile-msg">
          <i className="las la-envelope la-2x"></i>
          {newMessages} new messages
        </div>
        <Link className="MyProfile-booking-link" to="/profile/bookings">
          <Button variant="primary" className="MyProfile-booking-btn">
            My Bookings
          </Button>{" "}
        </Link>
        <Link className="MyProfile-inbox-link" to="/profile/inbox">
          <Button className="MyProfile-inbox-btn">Inbox</Button>
        </Link>
      </div>

      <div className="MyProfile-main">
        <div className="MyProfile-main-left">
          <h4 className="MyProfile-main-heading">Chef {`${chef.firstName} ${chef.lastName}`}</h4>
          <div className="MyProfile-main-detail-wrapper">
            <p className="MyProfile-main-detail">
              Years of experience: {chef.profile?.yearsOfExperience}
            </p>
            <p className="MyProfile-main-detail">Hourly rate: {chef.profile.hourlyRate}</p>
            <p className="MyProfile-main-detail">{chef.profile?.position}</p>
            <p className="MyProfile-main-detail">{chef?.city}</p>
          </div>
          <div className="MyProfile-main-tagbox">
            {editMode ? (
              <TagBox tags={tags} remove={true} />
            ) : (
              <TagBox tags={tags} remove={false} />
            )}
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
              <Button
                variant="success"
                className="MyProfile-editMode-btn"
                onClick={() => handleSaveProfile()}
              >
                Save
              </Button>
              <Button className="MyProfile-editMode-btn" onClick={() => setEditMode(!editMode)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              variant="secondary"
              className="MyProfile-editMode-btn"
              onClick={() => setEditMode(!editMode)}
            >
              Edit Profile
            </Button>
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
