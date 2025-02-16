import React, { useState, useRef, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchBox = () => {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState({ adult: 0, youth: 0, children: 0 });
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const dropdownRef = useRef(null);

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

  return (
    <div className="search-box">
      <form action="">
        <div className="inputs">
          <div className="input">
            <h3>{location ? location : "Location"}</h3>
            <input
              type="text"
              placeholder="Choose the destination"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="input">
            <h3>{checkIn ? checkIn.toLocaleDateString() : "Check-in"}</h3>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              minDate={today}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              placeholderText="Select check-in date"
            />
          </div>
          <div className="input">
            <h3>{checkOut ? checkOut.toLocaleDateString() : "Check-out"}</h3>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              minDate={checkIn || today}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              placeholderText="Select check-out date"
            />
          </div>
          <div className="input guest-input" onClick={() => setShowGuestDropdown(true)}>
            <span>
              <FaUser />{" "}
            </span>{" "}
            <h3>Guests: {totalGuests}</h3>
          </div>
          {showGuestDropdown && (
            <div className="guest-dropdown" ref={dropdownRef}>
              {Object.keys(guests).map((key) => (
                <div key={key} className="guest-category">
                  <span>{guests[key]}</span>
                  <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  <div className="signs">
                    <button onClick={(e) => handleGuestChange(key, -1, e)}>
                      -
                    </button>
                    <button onClick={(e) => handleGuestChange(key, 1, e)}>
                      +
                    </button>
                  </div>
                </div>
              ))}
              <button
                className="apply-btn"
                onClick={() => setShowGuestDropdown(false)}
              >
                Apply
              </button>
            </div>
          )}
          <div className="search-btn">
            <button>
              <span>
                <IoMdSearch />
              </span>
              <span>search</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
