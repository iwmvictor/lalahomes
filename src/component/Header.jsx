import React, { useState } from "react";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import { GoQuestion } from "react-icons/go";
import { Link } from "react-router-dom";
import { assets } from "../assets/Assets";
import { IoIosNotifications } from "react-icons/io";

const Header = () => {
  const [user, setUser] = useState(true);

  const toggleUser = () => {
    setUser(!user);
  };

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="content">
            <div className="left">
              <Link className="logo">
                <h2>Rentals</h2>
              </Link>
            </div>
            <div className="right">
              {user ? (
                <>
                  <div className="nav">
                    <button className="notification" id="notif">
                      <IoIosNotifications />
                    </button>
                    <Tooltip anchorId="notif" content="Notifications" />
                    <div className="userbtn">
                      <img src={assets.img.user} alt="" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="nav">
                    <li>
                      <a href="" id="support">
                        <GoQuestion />
                      </a>
                      <Tooltip anchorId="support" content="Customer Support" />
                    </li>
                    <Link to="/login" className="button">
                      Login
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
