import React, { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaPlus,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
// import "./ManageListings.scss";

const initialListings = [
  {
    id: "LST001",
    title: "Luxury Beach House",
    location: "Miami, FL",
    image: "https://via.placeholder.com/150",
    price: "$350/night",
    status: "Active",
  },
  {
    id: "LST002",
    title: "Modern Apartment",
    location: "New York, NY",
    image: "https://via.placeholder.com/150",
    price: "$250/night",
    status: "Inactive",
  },
];

const ManageListing = () => {
  const [listings, setListings] = useState(initialListings);
  const [editingListing, setEditingListing] = useState(null);
  const [newListing, setNewListing] = useState({
    title: "",
    location: "",
    price: "",
  });

  const handleDelete = (id) => {
    setListings((prev) => prev.filter((listing) => listing.id !== id));
  };

  const handleToggleStatus = (id) => {
    setListings((prev) =>
      prev.map((listing) =>
        listing.id === id
          ? {
              ...listing,
              status: listing.status === "Active" ? "Inactive" : "Active",
            }
          : listing
      )
    );
  };

  const handleEdit = (id) => {
    const listingToEdit = listings.find((listing) => listing.id === id);
    setEditingListing(listingToEdit);
  };

  const handleSaveEdit = () => {
    setListings((prev) =>
      prev.map((listing) =>
        listing.id === editingListing.id ? { ...editingListing } : listing
      )
    );
    setEditingListing(null);
  };

  const handleAddListing = () => {
    const newId = `LST${listings.length + 1}`;
    setListings([
      ...listings,
      {
        id: newId,
        ...newListing,
        status: "Active",
        image: "https://via.placeholder.com/150",
      },
    ]);
    setNewListing({ title: "", location: "", price: "" });
  };

  return (
    <div className="manage-listings">
      <h2>Your Listings</h2>

      {/* Add New Listing */}
      <div className="add-listing">
        <h3>Add New Listing</h3>
        <input
          type="text"
          placeholder="Title"
          value={newListing.title}
          onChange={(e) =>
            setNewListing({ ...newListing, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Location"
          value={newListing.location}
          onChange={(e) =>
            setNewListing({ ...newListing, location: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Price per night"
          value={newListing.price}
          onChange={(e) =>
            setNewListing({ ...newListing, price: e.target.value })
          }
        />
        <button className="add" onClick={handleAddListing}>
          <FaPlus /> Add Listing
        </button>
      </div>

      {/* Listings Table */}
      <div className="listing-container">
        {listings.map((listing) => (
          <div className="listing-card" key={listing.id}>
            <img src={listing.image} alt={listing.title} />
            <div className="listing-info">
              <h3>{listing.title}</h3>
              <p>{listing.location}</p>
              <p>{listing.price}</p>
              <span className={`status ${listing.status.toLowerCase()}`}>
                {listing.status}
              </span>
            </div>
            <div className="actions">
              <button className="edit" onClick={() => handleEdit(listing.id)}>
                <FaEdit /> Edit
              </button>
              <button
                className="delete"
                onClick={() => handleDelete(listing.id)}
              >
                <FaTrash /> Delete
              </button>
              <button
                className="toggle"
                onClick={() => handleToggleStatus(listing.id)}
              >
                {listing.status === "Active" ? <FaToggleOff /> : <FaToggleOn />}{" "}
                {listing.status === "Active" ? "Deactivate" : "Activate"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Listing Modal */}
      {editingListing && (
        <div className="edit-modal">
          <div className="modal-content">
            <h3>Edit Listing</h3>
            <input
              type="text"
              value={editingListing.title}
              onChange={(e) =>
                setEditingListing({ ...editingListing, title: e.target.value })
              }
            />
            <input
              type="text"
              value={editingListing.location}
              onChange={(e) =>
                setEditingListing({
                  ...editingListing,
                  location: e.target.value,
                })
              }
            />
            <input
              type="text"
              value={editingListing.price}
              onChange={(e) =>
                setEditingListing({ ...editingListing, price: e.target.value })
              }
            />
            <div className="modal-actions">
              <button className="save" onClick={handleSaveEdit}>
                <FaCheck /> Save
              </button>
              <button
                className="cancel"
                onClick={() => setEditingListing(null)}
              >
                <FaTimes /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageListing;
