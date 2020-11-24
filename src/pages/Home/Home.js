import React, { useEffect } from "react";
import { Container, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ChefCard from "../../components/ChefCard/ChefCard";
import { fetchAllUsers } from "../../store/users/userActions";
import { selectAllChefs } from "../../store/users/userSelectors";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const chefs = useSelector(selectAllChefs);

  console.log(chefs);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="Home">
      <Jumbotron>
        <h1>Home</h1>
      </Jumbotron>

      <div className="Home-profile-wrapper">
        {chefs.map((x) => {
          return (
            <ChefCard
              key={x.id}
              name={`${x.firstName} ${x.lastName}`}
              city={x.city}
              img={x.profile.imgUrl}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
