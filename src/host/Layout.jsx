import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

import "./../style/host.scss";

const HostLayout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
};

export default HostLayout;
