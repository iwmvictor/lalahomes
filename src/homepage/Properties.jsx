import React, { useState } from "react";
import { properties } from "../assets/Assets";
import PropertyCard from "../component/PropertyCard";

const HomeProperties = () => {
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 9;

  const sortedProperties = [...properties].sort((a, b) => {
    if (sortOption === "name-asc") return a.title.localeCompare(b.title);
    if (sortOption === "name-desc") return b.title.localeCompare(a.title);
    if (sortOption === "price-low-high") return a.price - b.price;
    if (sortOption === "price-high-low") return b.price - a.price;
    return 0;
  });

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = sortedProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  return (
    <div className="properties">
      <div className="container">
        <div className="content">
          <div className="sec-title">
            <h2>{properties.length} Properties Available for You</h2>
            <div className="title-row">
              <span>
                Showing {indexOfFirstProperty + 1} -{" "}
                {Math.min(indexOfLastProperty, properties.length)} of{" "}
                {properties.length} results
              </span>
              <div className="sort">
                <span>Sort by: </span>
                <select onChange={(e) => setSortOption(e.target.value)}>
                  <option value="default">Default</option>
                  <option value="name-asc">Name A-Z</option>
                  <option value="name-desc">Name Z-A</option>
                  <option value="price-low-high">Price Low-High</option>
                  <option value="price-high-low">Price High-Low</option>
                </select>
              </div>
            </div>
          </div>
          <div className="property-cards">
            {currentProperties.length > 0 ? (
              currentProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <p className="nop">No properties available at the moment.</p>
            )}
          </div>
          <div className="pagination">
            {Array.from(
              { length: Math.ceil(properties.length / propertiesPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProperties;
