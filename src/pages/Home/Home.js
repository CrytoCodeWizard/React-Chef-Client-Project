import React, { useEffect, useState } from "react";
import { Container, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ChefCard from "../../components/ChefCard/ChefCard";
import { fetchAllUsers } from "../../store/users/userActions";
import { selectAllChefs } from "../../store/users/userSelectors";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const chefs = useSelector(selectAllChefs);
  const [selectTagOne, setSelectTagOne] = useState(0);
  const [selectTagTwo, setSelectTageTwo] = useState(0);

  console.log(chefs);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="Home">
      <Jumbotron>
        <h1>Home</h1>
      </Jumbotron>

      <Container>
        <div className="Home-selector-wrapper">
          <select
            className="select-on-tag"
            onChange={(e) => {
              setSelectTagOne(parseInt(e.target.value));
            }}
          >
            <option value="">Select a tag</option>
            <option value="1">Michelin</option>
            <option value="2">British</option>
            <option value="3">Dutch</option>
            <option value="4">French</option>
            <option value="5">Mediterranean</option>
            <option value="6">Personal Chef</option>
            <option value="7">Italian</option>
            <option value="8">Pizza</option>
            <option value="9">Head Chef</option>
            <option value="10">Chef de Parti</option>
            <option value="11">Mexican</option>
            <option value="12">BBQ</option>
          </select>

          <select className="select-on-tag">
            <options></options>
          </select>
          <select className="select-on-rating">
            <options></options>
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
