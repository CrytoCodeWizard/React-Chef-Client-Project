import React, { useEffect } from "react";
import { Container, Jumbotron } from "react-bootstrap";
import { useDispatch } from "react-redux";
import ChefCard from "../../components/ChefCard/ChefCard";
import { fetchAllUsers } from "../../store/users/userActions";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="Home">
      <Jumbotron>
        <h1>Home</h1>
      </Jumbotron>
      <Container>
        <div className="Home-profile-wrapper">
          <ChefCard />
        </div>
      </Container>
    </div>
  );
}

export default Home;
