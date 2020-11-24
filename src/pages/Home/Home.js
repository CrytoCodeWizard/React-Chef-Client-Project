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
  const [selectTagOne, setSelectTagOne] = useState(0);
  const [selectTagTwo, setSelectTagTwo] = useState(0);

  // console.log("CHEFS", chefs);
  // console.log("TAGS", tags);

  console.log("SELECT-TAG-ONE", selectTagOne);
  console.log("SELECT-TAG-ONE", selectTagTwo);

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllTags());
  }, [dispatch]);

  return (
    <div className="Home">
      <Jumbotron>
        <h1>Home</h1>
      </Jumbotron>

      <Container>
        <div className="Home-selector-wrapper">
          <select
            className="Home-selector"
            onChange={(e) => {
              setSelectTagOne(parseInt(e.target.value));
            }}
          >
            <option value="">Select on tag</option>
            {tags.map((x) => (
              <option key={x.id} value={x.id}>
                {x.tagName}
              </option>
            ))}
          </select>

          <select
            className="Home-selector"
            onChange={(e) => {
              setSelectTagTwo(parseInt(e.target.value));
            }}
          >
            <option value="">Select on tag</option>
            {tags.map((x) => (
              <option key={x.id} value={x.id}>
                {x.tagName}
              </option>
            ))}
          </select>
          <select className="Home-selector">
            <option value="">5 star</option>
            <option value="">4 star</option>
            <option value="">3 star</option>
            <option value="">2 star</option>
            <option value="">1 star</option>
          </select>
        </div>

        <div className="Home-profile-wrapper">
          {chefs.map((x) => {
            return (
              <ChefCard
                key={x.id}
                name={`${x.firstName} ${x.lastName}`}
                city={x.city}
                img={x.profile.imgUrl}
                tags={x.profile.specializationTags}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default Home;
