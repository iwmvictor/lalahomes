import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./component/Layout";
import Homepage from "./pages/Homepage";
import Properties from "./pages/Properties";
import Property from "./pages/Property";
import HostLayout from "./host/Layout";
import AddList from "./host/pages/AddList";
import ManageListing from "./host/pages/ManageListing";
import ViewBooking from "./host/pages/ViewBooking";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="rentals" element={<Properties />} />
            <Route path="book/:id" element={<Property />} />
          </Route>
          <Route path="/host" element={<HostLayout />}>
            <Route index element={<AddList />} />
            <Route path="new-listing" element={<AddList />} />
            <Route path="view-bookings" element={<ViewBooking />} />
            <Route path="manage-listing" element={<ManageListing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
