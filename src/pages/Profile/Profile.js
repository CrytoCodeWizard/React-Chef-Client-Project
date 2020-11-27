import React, { useEffect, useState } from "react";
import moment from "moment";
import BookingCalendar from "../../components/BookingCalendar/Calendar.js";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/users/userActions";
import { selectChef } from "../../store/users/userSelectors";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { switchModal } from "../../store/messages/messageActions.js";

function Profile() {
  const dispatch = useDispatch();
  const params = useParams();
  const chef = useSelector(selectChef);

  const userId = parseInt(params.id);
  const [selectedDate, setSelectedDate] = useState(moment());

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  return (
    <Container className="height">
      <div className="Profile">
        <div className="Profile-top">
          <div className="Profile-img-wrapper">
            <img
              className="Profile-img"
              src="https://artzycafe.com/wp-content/uploads/2020/05/Vocations-in-Cooking.jpg"
              alt="chef"
            />
          </div>
          <button onClick={() => dispatch(switchModal())} className="Profile-booking-btn">
            Send message
          </button>
        </div>
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
            {chef.profile?.specializationTags.map((x) => (
              <div key={x.id} className="ChefCard-tag">
                {x.tagName}
              </div>
            ))}
            <p className="Profile-main-description">{chef.profile?.description}</p>
          </div>
        </div>
        <div className="Profile-main-right">
          <h1 className="Profile-main-right-header">Availability</h1>

          <BookingCalendar selectedDate={selectedDate} onChange={setSelectedDate} />
        </div>
      </div>
    </Container>
  );
}

export default Profile;
