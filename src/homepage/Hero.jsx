import React from "react";
import SearchBox from "../component/SearchBox";

const Hero = () => {
  return (
    <>
      <div className="hero">
        <div className="container">
          <div className="content">
            <div className="text">
              <h2>Find the best home for you</h2>
              <p>Discover your dream home with our top listings</p>
            </div>
          </div>
        </div>
        <div className="search">
          <SearchBox />
        </div>
      </div>
    </>
  );
};

export default Hero;
