import React from "react";
import HomeText from "./HomeText";

function Home() {
  return (
    <div className="homeContainer">
      <div className="titleContainer">
        <h2>THE CARBON PROJECT</h2>
      </div>
      <div className="subContainer">
        <HomeText />
      </div>
    </div>
  );
}

export default Home;
