import React, { useEffect, useState } from "react";
import { Container, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ChefCard from "../../components/ChefCard/ChefCard";
import { fetchAllTags } from "../../store/appData/appDataActions";
import { selectAllTags } from "../../store/appData/appDataSelectors";
import { fetchAllUsers } from "../../store/users/userActions";
import { selectAllChefs } from "../../store/users/userSelectors";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const chefs = useSelector(selectAllChefs);
  const tags = useSelector(selectAllTags);
  const [selectDate, setSelectDate] = useState("");
  const [selectTagOne, setSelectTagOne] = useState("");
  const [selectTagTwo, setSelectTagTwo] = useState("");
  const [selectRating, setSelectRating] = useState(0);

  const sortChefsByTagsAndDate = chefs.filter((chef) => {
    const chefTags = chef.profile.specializationTags;
    const chefAvailableDates = chef.profile.availableDates;
    const reviews = chef.profile.profileReviews;
    const reviewSum = reviews.reduce((a, b) => a + b.reviewScore, 0);
    const chefAverageRating = reviewSum / reviews.length;

    if ((selectTagOne || selectTagTwo) && selectDate) {
      return (
        chefAverageRating >= selectRating &&
        chefAvailableDates.some((date) => date.date === selectDate) &&
        (chefTags.some((tag) => tag.tagName === selectTagOne) ||
          chefTags.some((tag) => tag.tagName === selectTagTwo))
      );
    } else if (selectDate) {
      return (
        chefAverageRating >= selectRating &&
        chefAvailableDates.some((date) => date.date === selectDate)
      );
    } else if (!selectDate) {
      return (
        chefAverageRating >= selectRating &&
        (chefTags.some((tag) => tag.tagName === selectTagOne) ||
          chefTags.some((tag) => tag.tagName === selectTagTwo))
      );
    } else {
      return chef;
    }
  });

  const sortedChefs =
    selectTagOne === "" &&
    selectTagTwo === "" &&
    selectDate === "" &&
    selectRating === 0 &&
    selectDate === ""
      ? chefs
      : sortChefsByTagsAndDate;

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllTags());
  }, [dispatch]);

  return (
    <div className="Home">
      <Jumbotron className="Home-jumbotron">
        <h1 className="Home-jumbotron-header">Home</h1>
      </Jumbotron>

      <Container>
        <h1 className="Home-header">Meet our chefs</h1>
        <div className="Home-selector-wrapper">
          <div className="Home-selector-date">
            <input
              className="Home-date-selector"
              onChange={(e) => {
                setSelectDate(e.target.value);
              }}
              type="date"
            />
          </div>
          <div className="Home-selector-tag">
            <select
              className="Home-selector"
              onChange={(e) => {
                setSelectTagOne(e.target.value);
              }}
            >
              <option value="">Select on tag</option>
              {tags.map((x) => (
                <option key={x.id} value={x.tagName}>
                  {x.tagName}
                </option>
              ))}
            </select>

            <select
              className="Home-selector"
              onChange={(e) => {
                setSelectTagTwo(e.target.value);
              }}
            >
              <option value="">Select on tag</option>
              {tags.map((x) => (
                <option key={x.id} value={x.tagName}>
                  {x.tagName}
                </option>
              ))}
            </select>

            <select
              className="Home-selector"
              onChange={(e) => {
                setSelectRating(parseInt(e.target.value));
              }}
            >
              <option value="0">no rating</option>
              <option value="1">1 star</option>
              <option value="2">2 star</option>
              <option value="3">3 star</option>
              <option value="4">4 star</option>
              <option value="5">5 star</option>
            </select>
          </div>
        </div>

        <div className="Home-profile-wrapper">
          {sortedChefs.map((x) => {
            return (
              <ChefCard
                id={x.id}
                key={x.id}
                name={`${x.firstName} ${x.lastName}`}
                city={x.city}
                img={x.profile.imgUrl}
                tags={x.profile.specializationTags}
                reviews={x.profile.profileReviews}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default Home;
