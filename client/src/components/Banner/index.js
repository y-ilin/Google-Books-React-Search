import React from "react";
import "./style.css";
import Jumbotron from 'react-bootstrap/Jumbotron';

function Banner() {
  return (
    <Jumbotron>
      <h1>(React) Google Books Search</h1>
      <h4>Search for and Save Books of Interest</h4>
    </Jumbotron>
  );
}

export default Banner;
