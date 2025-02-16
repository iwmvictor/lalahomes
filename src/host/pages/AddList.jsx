import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


function AddList() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    size: "",
    checkIn: "",
    checkOut: "",
    petFriendly: false,
    location: "",
    thumbnail: "",
    gallery: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDescriptionChange = (content) => {
    setFormData({ ...formData, description: content });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Property Data:", formData);
  };

  return (
    <div className="addlist">
      <div className="db-container">
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="input">
              <label htmlFor="title">Property Title</label>
              <input
                type="text"
                name="title"
                placeholder="Type here .."
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input">
              <label htmlFor="description">Description</label>
              <ReactQuill
                value={formData.description}
                onChange={handleDescriptionChange}
              />
            </div>

            <div className="inputs">
              <div className="input">
                <label htmlFor="price">Price per Night ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input">
                <label htmlFor="bedrooms">Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input">
                <label htmlFor="bathrooms">Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input">
                <label htmlFor="size">Property Size (sqm)</label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="inputs">
              <div className="input">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input">
                <label htmlFor="petFriendly">Pet Friendly</label>
                <input
                  type="checkbox"
                  name="petFriendly"
                  checked={formData.petFriendly}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="inputs">
              <div className="input">
                <label htmlFor="thumbnail">Thumbnail URL</label>
                <input
                  type="text"
                  name="thumbnail"
                  placeholder="Thumbnail Image URL"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input">
                <label htmlFor="gallery">Gallery Images</label>
                <input
                  type="text"
                  name="gallery"
                  placeholder="Image URLs separated by commas"
                  value={formData.gallery.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gallery: e.target.value.split(", "),
                    })
                  }
                />
              </div>
            </div>

            <div className="inputs">
              <div className="input">
                <label htmlFor="checkIn">Check-In Time</label>
                <input
                  type="time"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input">
                <label htmlFor="checkOut">Check-Out Time</label>
                <input
                  type="time"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit">Submit Property</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddList;
