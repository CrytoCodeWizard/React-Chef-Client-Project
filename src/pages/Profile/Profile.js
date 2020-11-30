import React, { useEffect, useState } from "react";
import moment from "moment";
import BookingCalendar from "../../components/BookingCalendar/Calendar.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/users/userActions";
import { selectChef, selectChefTags } from "../../store/users/userSelectors";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { switchModal } from "../../store/messages/messageActions.js";
import TagBox from "../../components/TagBox/TagBox.js";
import { Button } from "react-bootstrap";

function Profile() {
  const dispatch = useDispatch();
  const params = useParams();
  const chef = useSelector(selectChef);
  const tags = useSelector(selectChefTags);
  const userId = parseInt(params.id);
  const [selectedDate, setSelectedDate] = useState(moment());

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  return (
    <div className="Profile container">
      <div className="Profile-top">
        <div className="Profile-img-wrapper">
          <img className="Profile-img" src={chef.profile.imgUrl} alt="chef" />
        </div>
        <Button
          variant="primary"
          onClick={() => dispatch(switchModal())}
          className="Profile-msg-btn"
        >
          Message
        </Button>
      </div>

      <div className="Profile-main">
        <div className="Profile-main-left">
          <h4 className="Profile-main-heading">Chef {`${chef.firstName} ${chef.lastName}`}</h4>
          <div className="Profile-main-detail-wrapper">
            <p className="Profile-main-detail">
              Years of experience: {chef.profile?.yearsOfExperience}
            </p>
            <p className="Profile-main-detail">Hourly rate: {chef.profile?.hourlyRate}</p>
            <p className="Profile-main-detail">{chef.profile?.position}</p>
            <p className="Profile-main-detail">{chef?.city}</p>
          </div>
          <div className="Profile-main-tagbox">
            {<TagBox tags={tags} remove={false} />}
            <p className="Profile-main-description">{chef.profile?.description}</p>
          </div>
        </div>
        <div className="Profile-main-right">
          <h1 className="Profile-main-right-header">Availability</h1>

          <BookingCalendar selectedDate={selectedDate} onChange={setSelectedDate} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
