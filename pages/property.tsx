"use client";

import Header from "@/components/Header/Header";
import React from "react";
import "../app/globals.css";
import Footer from "@/components/footer/Footer";

const PropertyPage = () => {
  return (
    <>
      <div className="w-full relative">
        <Header />
        <div className="mt-[4rem] w-full relative">
          <div className="h-[6rem] w-full relative"></div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PropertyPage;
