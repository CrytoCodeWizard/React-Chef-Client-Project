import React from "react";
import { Container, Jumbotron } from "react-bootstrap";
import ChefCard from "../../components/ChefCard/ChefCard";

function Home() {
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
