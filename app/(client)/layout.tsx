"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/footer/Footer";
import EventSection from "@/components/events/EventSection";
import Image from "next/image";

const LandingPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHomeInView, setIsHomeInView] = useState(false);

  useEffect(() => {
    const homeSection = document.getElementById("home");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsHomeInView(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    if (homeSection) observer.observe(homeSection);

    return () => {
      if (homeSection) observer.unobserve(homeSection);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      isHomeInView ? videoRef.current.play() : videoRef.current.pause();
    }
  }, [isHomeInView]);

  return (
    <div className="relative w-full h-screen font-sans">
      {/* Header */}
      <Header />

      {/* Home Section */}
      <section
        id="home"
        className="w-full h-screen flex justify-center items-center bg-primary relative"
      >
        <Image alt="bgImage" src="/bgimg.jpg" fill className="object-cover" />
        <div className="bg-primary w-full h-full absolute opacity-[.6]"></div>

        <div className="justify-center text-white items-start text-left p-4 pl-6 sm:pl-10 md:pl-20 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Welcome to <span className="text-yellow-600">Lala Rentals</span>
          </h1>
          <p className="text-lg sm:text-2xl mb-6">
            Book you rental place easyly.
          </p>
          {/* <a
            href="/auth/signin"
            className="bg-yellow-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-lg"
          >
            Get Started
          </a> */}
        </div>
      </section>

      {/* Event Section */}
      <EventSection />

      {/* Contact Section */}
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
};

export default LandingPage;
