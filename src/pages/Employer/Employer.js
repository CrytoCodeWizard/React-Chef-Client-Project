import React, { useEffect, useState } from "react";
import ImageUpload from "../../components/ImageUpload/imageUpload.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { selectToken, selectUser } from "../../store/userLogin/userLoginSelectors";
import { addUserTag, fetchUser, updateUserProfile } from "../../store/users/userActions";
import { selectChef, selectChefImage, selectChefTags } from "../../store/users/userSelectors";
import "./Employer.css";
import EditMode from "./EditMode.js";
import { newMessageCount } from "../../store/messages/messageSelectors.js";
import TagBox from "../../components/TagBox/TagBox.js";
import { Button, FormControl, InputGroup, OverlayTrigger } from "react-bootstrap";
import HoverToolTip from "../../components/HoverToolTip/HoverToolTip.js";
import { fetchUserMessages } from "../../store/messages/messageActions.js";

function EmployerProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectToken);
  const userId = useSelector(selectUser).id;
  const chef = useSelector(selectChef);
  const tags = useSelector(selectChefTags);
  const chefProfileImg = useSelector(selectChefImage);
  const newMessages = useSelector(newMessageCount);
  const profileId = parseInt(chef.profile?.id);
  const [editMode, setEditMode] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [imageModal, setImageModal] = useState(false);

  const [editProfile, setEditProfile] = useState({
    yearsOfExperience: 0,
    hourlyRate: 0,
    position: "",
    city: "",
    description: "",
  });

  if (!token || token === null) {
    history.push("/");
  }

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserMessages(userId));
      dispatch(fetchUser(userId));
    }
  }, [dispatch, userId, chefProfileImg]);

  const addTag = () => (e) => {
    if (e.key === "Enter" || e.type === "click") {
      dispatch(addUserTag(newTag, profileId));
      setNewTag("");
    }
  };

  const handleSaveProfile = () => {
    setEditMode(!editMode);
    dispatch(updateUserProfile(editProfile, userId, profileId));
  };

  return (
    <div className="Employer container">
      <div className="Employer-top">
        <div className="Employer-img-wrapper">
          <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={HoverToolTip}>
            <img
              onClick={() => setImageModal(!imageModal)}
              className="Employer-img"
              src={chefProfileImg}
              alt="chef"
            />
          </OverlayTrigger>
          {imageModal && <ImageUpload setImageModal={setImageModal} imageModal={imageModal} />}
        </div>
        <Link className="Employer-link" to="/profile/inbox">
          <div className="Employer-msg">
            <i className="las la-envelope la-2x"></i>
            {newMessages} new messages
          </div>
        </Link>
        <Link className="Employer-booking-link" to="/profile/bookings">
          <Button variant="primary" className="Employer-booking-btn">
            My Bookings
          </Button>{" "}
        </Link>
        <Link className="Employer-inbox-link" to="/profile/inbox">
          <Button className="Employer-inbox-btn">Inbox</Button>
        </Link>
      </div>

      <div className="Employer-main">
        <div className="Employer-main-left">
          <h3 className="Employer-main-heading">{`${chef.businessName}`}</h3>
          <p className="Employer-main-heading">{`${chef.firstName} ${chef.lastName}`}</p>
          <div className="Employer-main-detail-wrapper">
            <p className="Employer-main-detail">
              <span className="mr-2">
                {" "}
                <i className="las la-user-cog"></i>
              </span>
              Open Since: {chef.profile?.yearsOfExperience}
            </p>
            <p className="Employer-main-detail">
              <span className="mr-2">
                {" "}
                <i className="las la-euro-sign"></i>
              </span>
              Hourly rate: {chef.profile.hourlyRate}
            </p>
            <p className="Employer-main-detail">
              <span className="mr-2">
                {" "}
                <i className="las la-user-tag"></i>
              </span>
              {chef.profile?.position}
            </p>
            <p className="Employer-main-detail">
              <span className="mr-2">
                {" "}
                <i className="las la-map-marker-alt"></i>
              </span>
              {chef?.city}
            </p>
          </div>
          <div className="Employer-main-tagbox">
            {editMode ? (
              <TagBox tags={tags} remove={true} />
            ) : (
              <TagBox tags={tags} remove={false} />
            )}
            {editMode && (
              <InputGroup className="mb-3">
                <FormControl
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={addTag()}
                  value={newTag}
                  placeholder="Add a tag"
                  aria-label="add tag"
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                  <Button onClick={addTag()} variant="outline-secondary">
                    <i className="las la-check"></i>
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            )}
          </div>
          <p className="Employer-main-description">{chef.profile?.description}</p>
          {editMode && (
            <EditMode setEditProfile={setEditProfile} chef={chef} editProfile={editProfile} />
          )}
          {editMode ? (
            <div>
              <Button
                variant="success"
                className="Employer-editMode-btn"
                onClick={() => handleSaveProfile()}
              >
                Save
              </Button>
              <Button className="Employer-editMode-btn" onClick={() => setEditMode(!editMode)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              variant="secondary"
              className="Employer-editMode-btn"
              onClick={() => setEditMode(!editMode)}
            >
              Edit Profile
            </Button>
          )}
        </div>
        <div className="Employer-main-right">
          <h1 className="Employer-main-right-header">Employer</h1>
        </div>
      </div>
    </div>
  );
}

export default EmployerProfile;
