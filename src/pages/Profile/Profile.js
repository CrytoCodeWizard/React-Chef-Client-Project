import React, { useEffect, useState } from "react";
import moment from "moment";
import BookingCalendar from "../../components/BookingCalendar/Calendar.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/users/userActions";
import { selectSingleUser, selectSingleUserTags } from "../../store/users/userSelectors";
import "./Profile.css";
import { useParams } from "react-router-dom";
import TagBox from "../../components/TagBox/TagBox.js";
import { Button } from "react-bootstrap";
import SendMessageModal from "../../components/SendMessageModal/SendMessageModal.js";
import Review from "../../components/Review/Review.js";
import { fetchProfileReviews } from "../../store/reviews/reviewActions.js";
import { selectAllReviews } from "../../store/reviews/reviewSelectors.js";
import SimpleRating from "../../components/SimpleRating/SimpleRating.js";
import { selectToken } from "../../store/userLogin/userLoginSelectors.js";

function Profile() {
  const token = useSelector(selectToken);
  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const singleUser = useSelector(selectSingleUser);
  const tags = useSelector(selectSingleUserTags);
  const userId = parseInt(params.id);
  const reviews = useSelector(selectAllReviews);
  const [selectedDate, setSelectedDate] = useState(moment());

  useEffect(() => {
    dispatch(fetchUser(userId));
    dispatch(fetchProfileReviews(userId));
  }, [dispatch, userId]);

  return (
    <div className="Profile container">
      <div className="Profile-top">
        <div className="Profile-img-wrapper">
          <img className="Profile-img" src={singleUser.profile.imgUrl} alt="chef" />
        </div>
        {token && (
          <Button className="Profile-msg-btn" variant="primary" onClick={() => setModalShow(true)}>
            Message
          </Button>
        )}
        <SendMessageModal show={modalShow} onHide={() => setModalShow(false)} />
      </div>

      <div className="Profile-main">
        <div className="Profile-main-left">
          <h4 className="Profile-main-heading">
            Chef {`${singleUser.firstName} ${singleUser.lastName}`}
          </h4>
          <div className="Profile-main-detail-wrapper">
            <p className="Profile-main-detail">
              <span className="mr-2">
                {" "}
                <i className="las la-user-cog"></i>
              </span>
              Years of experience: {singleUser.profile?.yearsOfExperience}
            </p>
            <p className="Profile-main-detail">
              <span className="mr-2">
                {" "}
                <i className="las la-euro-sign"></i>
              </span>
              Hourly rate: {singleUser.profile.hourlyRate}
            </p>
            <p className="Profile-main-detail">
              <span className="mr-2">
                {" "}
                <i className="las la-user-tag"></i>
              </span>
              {singleUser.profile?.position}
            </p>
            <p className="Profile-main-detail">
              <span className="mr-2">
                {" "}
                <i className="las la-map-marker-alt"></i>
              </span>
              {singleUser?.city}
            </p>
          </div>
          <div className="Profile-main-tagbox">
            {<TagBox tags={tags} remove={false} />}
            <p className="Profile-main-description">{singleUser.profile?.description}</p>
          </div>
        </div>
        <div className="Profile-main-right">
          <h1 className="Profile-main-right-header">Availability</h1>
          <BookingCalendar selectedDate={selectedDate} onChange={setSelectedDate} />
        </div>
      </div>

      {token && (
        <div className="ProfileReviews">
          <h2 className="mb-4">Leave a review...</h2>
          <Review profileId={userId} />
          <h3>Reviews...</h3>
          <hr></hr>
          {reviews.map((x) => {
            return (
              <div key={x.id} className="review">
                <h5>{`${x.user.firstName} ${x.user.lastName} - ${x.user.businessName}`}</h5>
                <h6>{x.title}</h6>
                <p>{x.content}</p>
                <SimpleRating reviewScore={x.reviewScore} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Profile;
