import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ToTopCounter from "./ToTopCounter";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <ToTopCounter />
      <Footer />
    </div>
  );
};

export default Layout;
