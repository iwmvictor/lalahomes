import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";
import { assets } from "../../assets/Assets";
// import "./ViewBooking.scss";

const listings = [
  {
    id: "LST001",
    title: "Luxury Beach House",
    location: "Miami, FL",
    image: assets.listing.property2a, // Replace with real image URL
    bookings: [
      {
        id: "BK001",
        guest: "John Doe",
        checkIn: "2025-03-10",
        checkOut: "2025-03-15",
        status: "Pending",
        price: "$1,200",
      },
      {
        id: "BK002",
        guest: "Alice Johnson",
        checkOut: "2025-04-06",
        checkIn: "2025-04-01",
        status: "Confirmed",
        price: "$1,400",
      },
    ],
  },
  {
    id: "LST002",
    title: "Modern Apartment",
    location: "New York, NY",
    image: assets.listing.property1a, // Replace with real image URL
    bookings: [
      {
        id: "BK003",
        guest: "Michael Brown",
        checkIn: "2025-02-20",
        checkOut: "2025-02-25",
        status: "Cancelled",
        price: "$850",
      },
    ],
  },
];

const ViewBooking = () => {
  const [bookingData, setBookingData] = useState(listings);

  const updateBookingStatus = (listingId, bookingId, newStatus) => {
    setBookingData((prevData) =>
      prevData.map((listing) =>
        listing.id === listingId
          ? {
              ...listing,
              bookings: listing.bookings.map((booking) =>
                booking.id === bookingId ? { ...booking, status: newStatus } : booking
              ),
            }
          : listing
      )
    );
  };

  return (
    <div className="view-booking">
      <h2>Your Listings & Bookings</h2>
      {bookingData.map((listing) => (
        <div className="listing-card" key={listing.id}>
          <div className="listing-info">
            <img src={listing.image} alt={listing.title} />
            <div>
              <h3>{listing.title}</h3>
              <p>{listing.location}</p>
            </div>
          </div>
          <div className="booking-list">
            {listing.bookings.length > 0 ? (
              listing.bookings.map((booking) => (
                <div className="booking-card" key={booking.id}>
                  <p>
                    <strong>Guest:</strong> {booking.guest}
                  </p>
                  <p>
                    <strong>Check-in:</strong> {booking.checkIn} &nbsp; | &nbsp;
                    <strong>Check-out:</strong> {booking.checkOut}
                  </p>
                  <p>
                    <strong>Price:</strong> {booking.price}
                  </p>
                  <div className="actions">
                    <span className={`status ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                    <button className="preview">
                      <FaEye /> Preview
                    </button>
                    {booking.status === "Pending" && (
                      <>
                        <button
                          className="confirm"
                          onClick={() => updateBookingStatus(listing.id, booking.id, "Confirmed")}
                        >
                          <FaCheckCircle /> Confirm
                        </button>
                        <button
                          className="reject"
                          onClick={() => updateBookingStatus(listing.id, booking.id, "Rejected")}
                        >
                          <FaTimesCircle /> Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-bookings">No bookings yet.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewBooking;
