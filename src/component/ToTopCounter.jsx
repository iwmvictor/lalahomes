import React, { useState, useEffect } from "react";

import "./../style/component.scss";
import { GoArrowUp } from "react-icons/go";

const ToTopCounter = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollPercentage(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="to-top-container" onClick={scrollToTop}>
      <svg className="progress-circle" width="50" height="50">
        <circle className="bg" cx="25" cy="25" r="20" />
        <circle
          className="progress"
          cx="25"
          cy="25"
          r="20"
          strokeDasharray="125.6"
          strokeDashoffset={125.6 - (scrollPercentage / 100) * 125.6}
        />
      </svg>
      <span className="icon">
        <GoArrowUp />
      </span>
    </div>
  );
};

export default ToTopCounter;
