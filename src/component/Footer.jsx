import React, { useEffect, useState } from "react";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { Tooltip } from "react-tooltip";

const sliderContents = ["homes", "apartments", "vacation home", "villas"];

const Footer = () => {
  const year = new Date().getFullYear();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderContents.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="footer">
        <div className="top">
          <div className="container">
            <div className="content">
              <div className="text">
                <h2>
                  Find <span>{sliderContents[currentIndex]}</span> <br />
                  for your next home.
                </h2>
                <button>Find homes</button>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="container">
            <div className="content">
              <div className="copy">
                <p>&copy; {year} Lala Homes.</p>
              </div>
              <div className="logo">
                <h2>Lala Homes</h2>
              </div>
              <ul className="social">
                <li>
                  <a href="" id="fb">
                    <FaFacebookF />
                  </a>
                  <Tooltip anchorId="fb" content="Facebook" />
                </li>
                <li>
                  <a href="" id="utube">
                    <FaYoutube />
                  </a>
                  <Tooltip anchorId="utube" content="YouTube" />
                </li>
                <li>
                  <a href="" id="x">
                    <FaXTwitter />
                  </a>
                  <Tooltip anchorId="x" content="Twitter" />
                </li>
                <li>
                  <a href="" id="in">
                    <FaLinkedinIn />
                  </a>
                  <Tooltip anchorId="in" content="LinkedIn" />{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
