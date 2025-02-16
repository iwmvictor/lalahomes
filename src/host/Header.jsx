import React from "react";
import { useParams } from "react-router-dom";
import { assets, hosts } from "../assets/Assets";

const Header = () => {
  return (
    <>
      <div className="host-navbar">
        <div className="container">
          <div className="content">
            <div className="logo">
              <h2>Lala Homes</h2>
            </div>
            <div className="user">
              <span>Welcome, host</span>
              <span>
                <img src={assets.img.host} alt="" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
