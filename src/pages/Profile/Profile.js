import React, { useEffect, useState } from "react";
import moment from "moment";
import Calendar from "../../components/Calendar/Calendar.js";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectToken, selectUser } from "../../store/userLogin/userLoginSelectors";
import { fetchUser } from "../../store/users/userActions";
import { selectChef } from "../../store/users/userSelectors";
import "./Profile.css";

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const chef = useSelector(selectChef);

  const userId = parseInt(user.id);
  const [selectedDate, setSelectedDate] = useState(moment());

  useEffect(() => {
    if (!token || token === null) {
      history.push("/");
    }
    dispatch(fetchUser(userId));
  }, [dispatch, userId, history, token]);

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
          <button className="Profile-booking-btn">My Bookings</button>
          <button className="Profile-inbox-btn">Inbox</button>
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
            <p className="Profile-main-description">{chef.profile?.description}</p>
          </div>
          <div className="Profile-main-right">
            <h1 className="Profile-main-right-header">Availability</h1>

            <Calendar selectedDate={selectedDate} onChange={setSelectedDate} />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Profile;
