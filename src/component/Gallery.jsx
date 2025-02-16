import { useState, useEffect } from "react";

const Gallery = ({ property }) => {
  const images = property.gallery;
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide effect every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Handle manual image selection
  const handleImageClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="gallery">
      {/* Preview Section */}
      <div className="preview">
        <img src={images[activeIndex]} alt="Active Preview" />
      </div>

      {/* Thumbnails / Views */}
      <div className="views">
        {images.map((img, index) => (
          <div
            className={`view ${index === activeIndex ? "active" : ""}`}
            key={index}
            onClick={() => handleImageClick(index)}
          >
            <img src={img} alt={`Thumbnail ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
