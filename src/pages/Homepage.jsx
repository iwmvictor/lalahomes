import React from "react";

import "./../style/home.scss";
import Hero from "./../homepage/Hero";
import HomeProperties from "../homepage/Properties";


function Homepage() {
  return (
    <>
      <div className="homepage">
        <Hero />
        <HomeProperties />
      </div>
    </>
  );
}

export default Homepage;
