import React, { useState } from "react";
import { assets } from "../assets/Assets";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % property.gallery.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + property.gallery.length) % property.gallery.length
    );
  };

  return (
    <div className="property-card">
      <div className="image">
        <div className="images">
          <img src={property.gallery[currentIndex]} alt={property.title} />
          <div className="navs">
            <button className="prev" onClick={handlePrev}>
              &#10094;
            </button>
            <button className="next" onClick={handleNext}>
              &#10095;
            </button>
          </div>
        </div>
        <span className="price">${property.price} night</span>
      </div>
      <Link to={`/book/${property.id}`} className="description">
        <h3>{property.location}</h3>
        <p>{property.title}</p>
      </Link>
    </div>
  );
};

export default PropertyCard;
