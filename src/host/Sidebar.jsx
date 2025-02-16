import React from "react";
import { NavLink } from "react-router-dom";
import {
  TbLayoutGridAdd,
  TbLayoutList,
  TbListDetails,
  TbSmartHome,
} from "react-icons/tb";
import { Tooltip } from "react-tooltip";

const Sidebar = () => {
  return (
    <div className="host-sidebar">
      <div className="content">
        <NavLink to="/host/new-listing" activeClassName="active">
          <span className="icon" id="add">
            <TbLayoutGridAdd />
          </span>
          <Tooltip anchorId="add" content="New Listing" />
          <span className="txt">Add Listing</span>
        </NavLink>
        <NavLink to="/host/manage-listing" activeClassName="active">
          <span className="icon" id="manage">
            <TbSmartHome />
          </span>
          <Tooltip anchorId="manage" content="Manage Listings" />
          <span className="txt">Manage Listing</span>
        </NavLink>
        <NavLink to="/host/view-bookings" activeClassName="active">
          <span className="icon" id="booking">
            <TbLayoutList />
          </span>
          <Tooltip anchorId="booking" content="View Bookings" />
          <span className="txt">View Booking</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
