import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { hosts, properties } from "../assets/Assets";
import Gallery from "../component/Gallery";
import { IoBedOutline, IoClose, IoLocation } from "react-icons/io5";
import { MdOutlineBathroom, MdPets } from "react-icons/md";
import { PiResize } from "react-icons/pi";

import "./../style/property.scss";
import { Tooltip } from "react-tooltip";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Property() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const [receiptModal, setReceiptModal] = useState(false);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [guests, setGuests] = useState({ adult: 0, youth: 0, children: 0 });

  const toggleReceipt = () => {
    setReceiptModal(!receiptModal);
  };

  const property = properties.find((p) => p.id === parseInt(id));

  if (!property) {
    return (
      <>
        <div className="container">
          <p className="nop">Property not found</p>
        </div>
      </>
    );
  }

  const host = hosts.find((h) => h.id === property.hostId);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowGuestDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const today = new Date();

  const handleGuestChange = (type, amount, event) => {
    event.preventDefault();

    setGuests((prev) => {
      const newValue = Math.max(0, prev[type] + amount);
      return { ...prev, [type]: newValue };
    });
  };

  const totalGuests = guests.adult + guests.youth + guests.children;
  const numberOfNights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
  const totalPrice = numberOfNights * property.price * totalGuests;

  return (
    <>
      <div className="propertypage">
        <div className="hero">
          <img src={property.thumbnail} alt="" />
          <div className="overlay"></div>
        </div>
        <div className="container">
          <div className="content">
            <div className="main">
              <div className="thegallery">
                <Gallery property={property} />
              </div>
              <div className="description">
                <h2>{property.title}</h2>
                <div className="counts">
                  <div className="count">
                    <span className="icon">
                      <IoBedOutline />
                    </span>
                    <span>
                      {property.bedrooms}{" "}
                      {property.bedrooms.length > 1 ? "bedroom" : "bedrooms"}
                    </span>
                  </div>
                  <div className="count">
                    <span className="icon">
                      <MdOutlineBathroom />
                    </span>
                    <span>
                      {property.bathrooms}{" "}
                      {property.bathrooms.length > 1 ? "bathroom" : "bathrooms"}
                    </span>
                  </div>
                  <div className="count">
                    <span className="icon">
                      <PiResize />
                    </span>
                    <span>{property.size} </span>
                  </div>
                  <div className="count">
                    <span className="icon">
                      <MdPets />
                    </span>
                    <span>
                      {!property.petFriendly
                        ? "No Pets Allowed"
                        : "Pet Friendly"}
                    </span>
                  </div>
                </div>

                <div className="location">
                  <span className="icon">
                    <IoLocation />
                  </span>
                  <span>{property.location}</span>
                </div>

                {host ? (
                  <>
                    <div className="host">
                      <div className="img">
                        <img src={host.img} alt="" />
                      </div>
                      <div className="names">
                        <h3>{host.name}</h3>
                        <p id="p" className="truncate">
                          {host.bio}
                        </p>
                        <Tooltip anchorId="p" content={host.bio} />
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="nop">No enough info about the host</p>
                )}

                <div
                  className="rich-text"
                  dangerouslySetInnerHTML={{ __html: property.description }}
                ></div>
              </div>
            </div>
            <div className="sidebar">
              <div className="book">
                <div className="price">
                  <h2>${property.price}</h2>
                  <p>night</p>
                </div>
                <form action="">
                  <div className="inputs">
                    <div className="input">
                      <DatePicker
                        selected={checkIn}
                        onChange={(date) => setCheckIn(date)}
                        minDate={today}
                        selectsStart
                        startDate={checkIn}
                        placeholderText="Check In Date"
                      />
                    </div>
                    <div className="input">
                      <DatePicker
                        selected={checkOut}
                        onChange={(date) => setCheckOut(date)}
                        minDate={checkIn || today}
                        selectsEnd
                        startDate={checkIn}
                        endDate={checkOut}
                        placeholderText="Check Out Date"
                      />
                    </div>
                  </div>
                  <div
                    className="input"
                    onClick={() => setShowGuestDropdown(true)}
                  >
                    <p>
                      {totalGuests} {totalGuests > 1 ? "guests" : "guest"}
                    </p>
                  </div>
                  {showGuestDropdown && (
                    <div className="guest-dropdown" ref={dropdownRef}>
                      {Object.keys(guests).map((key) => (
                        <div className="guest-category" key={key}>
                          <span>{guests[key]}</span>
                          <span>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </span>
                          <div className="signs">
                            <button
                              onClick={(e) => handleGuestChange(key, -1, e)}
                            >
                              {" "}
                              -{" "}
                            </button>
                            <button
                              onClick={(e) => handleGuestChange(key, 1, e)}
                            >
                              {" "}
                              +{" "}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="btn">
                    <button>Reserve</button>
                  </div>
                </form>
                <div className="button">
                  <button onClick={toggleReceipt}>Preview Receipt</button>
                </div>
              </div>
              <div className="host"></div>
            </div>
          </div>
        </div>
      </div>
      {receiptModal && (
        <>
          <div className="receipt-modal">
            <button onClick={toggleReceipt} className="close">
              <IoClose />
            </button>
            <div className="content">
              <div className="prop-info">
                <div className="line">
                  <span className="title">Property Id:</span>
                  <span className="conts">{property.id}</span>
                </div>
                <div className="line">
                  <span className="title">Title:</span>
                  <span className="conts truncate1" >{property.title}</span>
                </div>
                <div className="line">
                  <span className="title">Property Address:</span>
                  <span className="conts">{property.location}</span>
                </div>
              </div>

              <div className="book-info">
                <div className="line">
                  <span className="title">Booking Number:</span>
                  <span className="conts">xxx</span>
                </div>
                <div className="line">
                  <span className="title">Payment Reference:</span>
                  <span className="conts">xxx</span>
                </div>
              </div>

              <div className="date-info">
                <div className="line">
                  <span className="title">Check In:</span>
                  <span className="conts">
                    {checkIn
                      ? checkIn.toLocaleDateString()
                      : "Select Check in date"}
                  </span>
                </div>
                <div className="line">
                  <span className="title">Check Out:</span>
                  <span className="conts">
                    {checkOut
                      ? checkOut.toLocaleDateString()
                      : "Select checkout date"}
                  </span>
                </div>
              </div>

              <div className="price-info">
                <div className="line">
                  <span className="title">Numer of days:</span>
                  <span className="conts">{numberOfNights}</span>
                </div>
                <div className="line">
                  <span className="title">Total Price:</span>
                  <span className="conts">$ {totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Property;
